// The machine object holds all information related to the interfaced machine
var machine = {};
machine.playing = false;
machine.playing_counter = 0;
machine.config_override = {};

// Run a command and if needed, display the result
function runCommand(cmd, silent) {
    // Check if this is a play command
    var playing = cmd.match(/^play (.*)/);
    if (playing) {
        $("#playing_modal").modal({backdrop: 'static', keyboard: false});
    }
    // Send the data using post
    $.post(machine.url + (silent ? "command_silent" : "command"), cmd + "\n").done(function (data) {
        if (silent) {
            return;
        }
        var state = getCommandState(cmd, data);
        var result = "<li> <i class='milestone-default glyphicon glyphicon-arrow-right'></i> <kbd>" + cmd + "</kbd></li><li><i class='milestone-" + state.answer + " glyphicon glyphicon-" + state.icon + "'></i><pre>" + data + "</pre></li>";
        // Display command result
        $("#command_result").empty().append(result);
        $('#command_result').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        // Add to command log
        $("#command_log").append(result);
        // Handle starting playing a file
        if (playing) {
            machine.playing = true;
            loop_while_playing();
        }
        // Handle abort Commands
        if (cmd.match(/^abort/)) {
            machine.playing = false;
        }

    });
}

// Run a command in silent mode ( no displaying of result )
function runCommandSilent(cmd) {
    runCommand(cmd, true);
}

// Run a command with a callback
function runCommandCallback(cmd, callback) {
    var posting = $.post(machine.url + "command", cmd + "\n", callback);
}

// Joystick clicked in the XY direction
function jogXYClick(cmd) {
    runCommand("M120\nG91\nG0 " + cmd + " F" + $("#xy_velocity").val() + "\nM121", true)
}

// Joystick clicked in the Z direction
function jogZClick(cmd) {
    runCommand("M120\nG91\nG0 " + cmd + " F" + $("#z_velocity").val() + "\nM121", true)
}

// Extrude filament
function extrude(event, a, b) {
    var length = document.getElementById("extrude_length").value;
    var velocity = document.getElementById("extrude_velocity").value;
    var direction = (event.currentTarget.id == 'extrude') ? 1 : -1;
    runCommand("M120\nG91\nG0 E" + (length * direction) + " F" + velocity + "\nM121", true);
}

// Turn motors off
function motorsOff(event) {
    runCommand("M18", true);
}

// Set temperature for a given temperature control module
function heatSet(code, letter) {
    var temperature = $("#heat_value_" + letter).val();
    runCommand("M" + code + " S" + temperature, true);
}

// Turn temperature off for a given temperature control module
function heatOff(code) {
    runCommand("M" + code + " S0", true);
}

// A file was selected and is ready to be uploaded
function handleFileSelect(evt) {
    var files = evt.target.files; // handleFileSelectist object
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name.replace(/ /, "_")), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

// Upload a file selected by the user
function upload() {
    $("#progress").empty();
    $("#uploadresult").empty();

    // take the file from the input
    var file = document.getElementById('files').files[0];
    var filename = file.name.replace(/ /, "_")
    var reader = new FileReader();
    reader.readAsBinaryString(file); // alternatively you can use readAsDataURL
    reader.onloadend = function (evt) {
        // create XHR instance
        xhr = new XMLHttpRequest();

        // send the file through POST
        xhr.open("POST", machine.url + 'upload', true);
        xhr.setRequestHeader('X-Filename', filename);

        // make sure we have the sendAsBinary method on all browsers
        XMLHttpRequest.prototype.mySendAsBinary = function (text) {
            var data = new ArrayBuffer(text.length);
            var ui8a = new Uint8Array(data, 0);
            for (var i = 0; i < text.length; i++)
                ui8a[i] = (text.charCodeAt(i) & 0xff);
            if (typeof window.Blob == "function") {
                var blob = new Blob([data]);
            } else {
                var bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
                bb.append(data);
                var blob = bb.getBlob();
            }
            this.send(blob);
        }

        // let's track upload progress
        var eventSource = xhr.upload || xhr;
        eventSource.addEventListener("progress", function (e) {
            // get percentage of how much of the current file has been sent
            var position = e.position || e.loaded;
            var total = e.totalSize || e.total;
            var percentage = Math.round((position / total) * 100);

            // here you should write your own code how you wish to proces this
            //$( "#progress" ).empty().append('uploaded ' + percentage + '%');
            $("#uploading_status .progress-bar").attr('style', "width:" + percentage + "%").html(percentage + '%');
        });

        // state change observer - we need to know when and if the file was successfully uploaded
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // process success
                    $("#uploading_status").slideUp();
                    $("#uploadresult").empty().append('Upload of ' + filename + ' finished.');
                    document.getElementById("files").value = "";
                } else {
                    // process error
                    $("#uploading_status").slideUp();
                    $("#uploadresult").empty().append('Uploaded failed, error ' + xhr.status + '.');
                }
            }
        };

        // start sending
        xhr.mySendAsBinary(evt.target.result);
        $("#uploading_status").slideDown();

    };
}

// Upload the configuration file
function uploadConfig(reset) {
    $("#progress").empty();
    $("#uploadresult").empty();

    var text = $("#config_content").val();
    machine.config_file = text;

    // create XHR instance
    xhr = new XMLHttpRequest();

    // send the file through POST
    xhr.open("POST", machine.url + 'upload', true);
    xhr.setRequestHeader('X-Filename', machine.config_file_name);

    // make sure we have the sendAsBinary method on all browsers
    XMLHttpRequest.prototype.mySendAsBinary = function (text) {
        var data = new ArrayBuffer(text.length);
        var ui8a = new Uint8Array(data, 0);
        for (var i = 0; i < text.length; i++)
            ui8a[i] = (text.charCodeAt(i) & 0xff);

        if (typeof window.Blob == "function") {
            var blob = new Blob([data]);
        } else {
            var bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
            bb.append(data);
            var blob = bb.getBlob();
        }
        this.send(blob);
    }

    // let's track upload progress
    var eventSource = xhr.upload || xhr;
    eventSource.addEventListener("progress", function (e) {
        // get percentage of how much of the current file has been sent
        var position = e.position || e.loaded;
        var total = e.totalSize || e.total;
        var percentage = Math.round((position / total) * 100);

        // here you should write your own code how you wish to proces this
        //$( "#progress" ).empty().append('uploaded ' + percentage + '%');
        $("#uploading_status .progress-bar").attr('style', "width:" + percentage + "%").html(percentage + '%');
    });

    // state change observer - we need to know when and if the file was successfully uploaded
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                $("#uploading_status").slideUp();
                // process success
                $("#uploadresult").empty().append('Uploaded Ok');
                parse_config(text);
                if (reset) {
                    runCommand("reset");
                }
            } else {
                // process error
                $("#uploading_status").slideUp();
                $("#uploadresult").empty().append('Uploaded Failed');
            }
        }
    };

    // start sending
    xhr.mySendAsBinary(text);
    $("#uploading_status").slideDown();


}

// Play file on the SD card
function playFile(filename) {
    runCommand("play /sd/" + filename);
}

// Refresh the file list
function refreshFiles() {
    document.getElementById('fileList').innerHTML = '';
    runCommandCallback("M20", function (data) {
        $.each(data.split('\n'), function (index) {
            var item = this.trim();
            if (item.match(/\.g(code)?$/) || item.match(/\.nc?$/)) {
                var table = document.getElementById('fileList');
                var row = table.insertRow(-1);
                var cell = row.insertCell(0);
                var text = document.createTextNode(item);
                cell.appendChild(text);
                cell = row.insertCell(1);
                cell.innerHTML = "[<a href='javascript:void(0);' onclick='playFile(\"" + item + "\");'>Play</a>]";
            }
            //$( "#result" ).append( this + '<br/>' );
        });
    });
}

// To do once the document is loaded
$(function () {
    // Show the start up modal
    $('#start_modal').modal();
    // Hide the close button
    $("#start_modal .modal-footer").hide();
    $("#ip_input").hide();
    // Log connection attempt
    $("#start_log").append("<li>Attempting connection to /</li>");
    $.post("/command", "version\n").done(function (data) {
        connected("/", data);
    }).fail(function () {
        $("#start_log").append("<li>Connection failure for /</li>");
        $("#ip_input").slideDown();
        $("#ip_input button").click(function () {
            var ip = "http://" + $("#ip_input input").val();
            $("#start_log").append("<li>Attempting connection to " + ip + "</li>");
            $.post(ip + "/command", "version\n").done(function (data) {
                connected(ip + "/", data);
            }).fail(function () {
                $("#start_log").append("<li>Connection failure for " + ip + "</li>");
            });
        });
    });
});

function connected(url, version) {
    // Log that connection was succesful
    $("#start_log").append("<li>Connection to " + url + " succesful</li>");
    $("#start_log").append("<li>Version : « " + version + "»</li>");

    $("#ip_input").hide();
    // Save IP
    machine.url = url;
    // Get config file
    $("#start_log").append("<li>Obtaining configuration</li>");
    $.ajax({url: machine.url + "sd/config.txt"}).done(function (data) {
        $("#start_log").append("<li>Successfully obtained «config.txt» file.</li>");
        machine.config_file_name = "config.txt";
        parse_config(data);
    }).fail(function () {
        $.ajax({url: machine.url + "sd/config"}).done(function (data) {
            $("#start_log").append("<li>Successfully obtained «config» file</li>");
            machine.config_file_name = "config";
            parse_config(data);
        }).fail(function () {
            $("#start_log").append("<li>Error : No configuration file found</li>");
        });
    });
}

function parse_config(data) {
    // Parse config file data
    $("#start_log").append("<li>Parsing configuration file</li>");

    // Actual Parsing
    // Remember the config's content
    machine.config_file = data;
    machine.config = {};

    // Parse and save entries
    machine.config.entries = {};
    machine.config.root = {};

    data.split("\n").forEach(function (line) {
        // For each entry
        if (line.match(/^(\s*)\#/g) || line == '' || line.match(/^[\s\n]*$/)) {
            return;
        }

        // Separate name from value
        var match = line.match(/^([\w_\-\.]*)\s+(.*?)(?!\S)/);

        var name = match[1];
        var value = match[2];

        // Save raw entry
        machine.config.entries[name] = value;

        // Save extracted entries
        var key_path = name.split('.');
        if (key_path.length == 1) {
            machine.config.root[key_path[0]] = value;
        } else if (key_path.length == 2) {
            if (machine.config[key_path[0]] == undefined) {
                machine.config[key_path[0]] = {};
            }
            machine.config[key_path[0]][key_path[1]] = value;
        } else if (key_path.length == 3) {
            if (machine.config[key_path[0]] == undefined) {
                machine.config[key_path[0]] = {};
            }
            if (machine.config[key_path[0]][key_path[1]] == undefined) {
                machine.config[key_path[0]][key_path[1]] = {};
            }
            machine.config[key_path[0]][key_path[1]][key_path[2]] = value;
        }

    }, this);

    $("#start_log").append("<li>Configuration fully parsed</li>");

    // Configure the interface
    // Hide or show the extruder panel
    if (machine.config.extruder != undefined && machine.config.extruder.hotend.enable == 'true') {
        $("#extruder_panel").slideDown();
        $("#extruder_controls").empty();
        var template = Handlebars.compile(document.getElementById("extruder_template").innerHTML);
        Object.keys(machine.config.extruder).forEach(function (key, index) {
            var html = template({name: key});
            $("#extruder_controls").append(html);
        });
    } else {
        $("#extruder_panel").hide();
    }
    // Hide or show the temperature panel
    if (machine.config.temperature_control != undefined && (machine.config.temperature_control.hotend.enable == 'true' || machine.config.temperature_control.bed.enable == 'true')) {
        $("#temperature_panel").slideDown();
        $("#temperature_controls").empty();
        var template = Handlebars.compile(document.getElementById("temperature_template").innerHTML);
        Object.keys(machine.config.temperature_control).forEach(function (key, index) {
            var config = machine.config.temperature_control[key];
            var letter = config.designator;
            var min_temp = 20;
            if (key.match(/hotend/)) {
                min_temp = 160;
            }
            var max_temp = 300;
            if (key.match(/bed/)) {
                max_temp = 120;
            }
            if (config.max_temp != undefined) {
                max_temp = config.max_temp;
            }
            var list = [];
            for (i = min_temp; i <= max_temp; i = i + 10) {
                list.push(i);
            }
            var html = template({name: key, letter: letter, config: config, temps: list });
            $("#temperature_controls").append(html);
            $("#" + letter + "_panel").mouseenter(function () {
                $("#" + letter + "_slider").show();
            }).mouseleave(function () {
                $("#" + letter + "_slider").hide();
            });
            $("#" + letter + "_dial").knob({
                min: min_temp,
                max: max_temp,
                release: function (data) {
                    setTemp(key, data);
                }
            });
            // Value updates
            $("#heat_value_" + letter).change(function () {
                $("#set_to_" + letter).html($("#heat_value_" + letter).val());
            });
        });
    } else {
        $("#temperature_panel").hide();
    }

    // Hide or show the switch panel
    if (machine.config.switch != undefined) {
        $("#switch_panel").slideDown();
        $("#switch_controls").empty();
        var template = Handlebars.compile(document.getElementById("switch_template").innerHTML);
        Object.keys(machine.config.switch).forEach(function (key, index) {
            var html = template({
                name: key,
                'switch': machine.config.switch[key],
            });
            $("#switch_controls").append(html);
        });
    } else {
        $("#switch_panel").hide();
    }

    // Hide or show the laser panel
    if (machine.config.root.laser_module_enable == 'true') {
        $("#laser_panel").slideDown();
    } else {
        $("#laser_panel").hide();
    }


    // Set up jogging speeds
    if (machine.config.root.alpha_max_rate != undefined) {
        $("#xy_velocity").val(machine.config.root.alpha_max_rate);
    }
    if (machine.config.root.gamma_max_rate != undefined) {
        $("#z_velocity").val(machine.config.root.gamma_max_rate);
    }

    // Refresh the file list
    refreshFiles();

    // Hide the modal finally
    $("#start_modal").modal("hide");

    // Set up all tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Hide upload data
    $("#uploading_status").hide();

    // Set up all spinboxes
    $('.spinbox').spinbox();

    // Get config override data
    runCommandCallback("M220 M221 M503", function (data) {
        var speed = data.split('\n')[0].match(/Speed factor at (.*?) \%/);
        if (speed) {
            data += "\nM220 S" + speed[1];
        }
        var flow = data.split('\n')[1].match(/Flow rate at (.*?) \%/);
        if (flow) {
            data += "\nM221 S" + flow[1];
        }
        $.each(data.split('\n'), function (index) {
            var codes = this.trim().split(' ');
            if (!codes[0].match(/^\;/)) {
                var code = codes.shift();
                var values = {};
                $.each(codes, function (index) {
                    var m = this.match(/([A-Z])(.*)/);
                    if (m) {
                        values[m[1]] = m[2];
                    }
                });
                if (code == 'M301') {
                    code += 'S' + values['S'];
                }
                $.each(values, function (index) {
                    if (machine.config_override[code] === undefined) {
                        machine.config_override[code] = {};
                    }
                    machine.config_override[code][index] = Number(values[index]);
                });
            }
        });
    });

}

// Get a list of temperature options based on config
function getTempList(name, config) {

    return list;
}

// Edit the configuration file in a modal
function editConfig() {
    // Show configuration edition modal
    $("#config_edit_modal").modal();
    $("#config_content").val(machine.config_file);
}

// Display the full file list in a modal
function displayFileList(path) {
    // Get file list from server
    var files = [];
    var id = 0;
    $("#file_actions").slideUp();
    runCommandCallback("ls -s " + path, function (data) {
        $.each(data.split('\n'), function (index) {
            id++;
            var item = this.trim();
            var name = item.replace(/\/$/, '');
            var folder = false;
            if (item !== name) {
                folder = true;
            }
            var splitted = name.split(' ');
            var size = formatBytes(splitted[splitted.length-1]);
            if(!folder) {
                splitted.splice(splitted.length-1, 1)
            }
            name = splitted.join(" ")
            if (folder) {
                size = '--';
            }
            if (name != '') {
                files.push({'name': name, 'size': size, 'id': id, 'folder': folder});
            }
        });
        var template = Handlebars.compile(document.getElementById("file_list_template").innerHTML);
        var html = template({'files': files, 'path': path});
        $("#file_list").html(html);
        $("#file_list_modal").modal();
    });
}

// Display information about a specific file
function displayFile(file, size) {
    $("#file_actions").slideDown();
    // Get file extract
    runCommandCallback("cat " + file + " 100", function (data) {
        var template = Handlebars.compile(document.getElementById("file_template").innerHTML);
        var html = template({'file': file, 'size': size, 'data': data + "[...]\n"});
        $("#file_list").html(html);
        $("#file_list_modal").modal();
        $("#delete_file").click(function () {
            runCommandCallback("rm " + file, function (data) {
                displayFileList("/sd/");
            });
        });
        $("#play_file").click(function () {
            runCommand("play " + file);
            $("#file_list_modal").modal("hide");
        });
    });
}

// Format bytes into human readable values
function formatBytes(a, b) {
    if (0 == a)
        return"0 Bytes";
    var c = 1024, d = b || 2, e = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

// Periodic tick ( status updates )
window.setInterval(function () {
    if (machine.playing || machine.config === undefined) {
        return;
    }
    $("#playing_modal").modal('hide');
    runCommandCallback("progress\nM105\nget pos\n", function (data) {
        // Progress status
        var answers = data.split('\n');
        var progress_answer = answers[0].trim();
        if (progress_answer.match(/Not.currently.playing/)) {
            machine.playing = false;
        } else {
            machine.playing = true;
            return;
        }
        // Temperature status
        var temperature_answer = answers[1].trim();
        var sensors = temperature_answer.split(/([A-Z])/);
        sensors.shift();
        for (i = 0; i < sensors.length; i = i + 2) {
            var letter = sensors[i];
            var cut = sensors[i + 1].match(/:(.+?) \/(.+?) @(\d+)[ ]?/);
            $("#" + letter + "_temp").html(cut[1]);
            $("#" + letter + "_target").html(cut[2] + " °C");
            $("#" + letter + "_power").html(cut[3]);
            if (cut[1] == 'inf') {
                $("#" + letter + "_panel .alert").show();
            }
            
            // Get max temp
            var max_temp = 250;
            if (machine.config['temperature_control'] != undefined) {
                Object.keys(machine.config['temperature_control']).forEach(function (key) {
                    if (machine.config['temperature_control'][key].designator == letter && machine.config['temperature_control'][key]['max_temp'] != undefined) {
                        max_temp = machine.config['temperature_control'][key]['max_temp'];
                    }
                });
            }
            
            // Display progress bar
            if (cut[1] != 'inf') {
                var temp_pc = (cut[1] / max_temp) * 100;
                var target_pc = ((cut[2] / max_temp) * 100) - temp_pc;
                $("#" + letter + "_temp_pc").attr("style", "width: " + temp_pc + '%');
                $("#" + letter + "_target_pc").attr("style", "width: " + target_pc + '%');
            }
            // Update set value
            //if ($("#heat_value_" + letter).val() != cut[2] && !$("#heat_value_" + letter).is(":focus")) {
            //    $("#heat_value_" + letter).val(cut[2]);
            //}
        }
        // Handle position status
        console.log(answers[3])
        var wcs = answers[3].trim().match(/.*WCS: X:([\d\.\-]+) Y:([\d\.\-]+) Z:([\d\.\-]+)/);
        var mcs = answers[4].trim().match(/.*MCS: X:([\d\.\-]+) Y:([\d\.\-]+) Z:([\d\.\-]+)/);
        if (wcs) {
            //$("#machine_status").html(wcs[1]);
            $("#machine_position_X").html(mcs[1]);
            $("#machine_position_Y").html(mcs[2]);
            $("#machine_position_Z").html(mcs[3]);
            $("#work_position_X").html(wcs[1]);
            $("#work_position_Y").html(wcs[2]);
            $("#work_position_Z").html(wcs[3]);
        }



    });
}, 1000);

// Periodic tick ( while playing )
function loop_while_playing() {
    if (!machine.playing) {
        return;
    }

    // If at beginning of loop, get status
    if (machine.playing_counter == 0) {
        runCommandCallback("progress", function (data) {
            var answers = data.split('\n');
            var progress_answer = answers[0].trim();
            machine.playing_progress = progress_answer;
            if (progress_answer.match(/Not.currently.playing/)) {
                machine.playing = false;
            } else {
                machine.playing = true;
                // Parse data
                if (progress_answer.match(/est time/)) {
                    var found = progress_answer.match(/file: (.+?), (\d+) % complete, elapsed time: (\d+):(\d+):(\d+), est time: (\d+):(\d+):(\d+)/);
                    machine.playing_status = {file: found[1], percent: found[2], elapsed: {hour: found[3], minute: found[4], second: found[5]}, estimated: {hour: found[6], minute: found[7], second: found[8]}};
                } else {
                    var found = progress_answer.match(/file: (.+?), (\d+) % complete, elapsed time: (\d+):(\d+):(\d+)/);
                    machine.playing_status = {file: found[1], percent: found[2], elapsed: {hour: found[3], minute: found[4], second: found[5]}, estimated: {hour: '00', minute: '00', second: '00'}};
                }
            }
        });
    }

    // Loop
    machine.playing_counter++;
    if (machine.playing_counter >= 30) {
        machine.playing_counter = 0;
    }

    // Increase elapsed time
    machine.playing_status.elapsed.second = Number(machine.playing_status.elapsed.second) + 1;
    if (machine.playing_status.elapsed.second < 10) {
        machine.playing_status.elapsed.second = '0' + machine.playing_status.elapsed.second;
     }
    if (machine.playing_status.elapsed.second == 60) {
        machine.playing_status.elapsed.second = '00';
        machine.playing_status.elapsed.minute = Number(machine.playing_status.elapsed.minute) + 1;
        if (machine.playing_status.elapsed.minute < 10) {
            machine.playing_status.elapsed.minute = '0' + machine.playing_status.elapsed.minute;
         }
        if (machine.playing_status.elapsed.minute == 60) {
            machine.playing_status.elapsed.hour = Number(machine.playing_status.elapsed.hour) + 1;
            if (machine.playing_status.elapsed.hour < 10) {
                machine.playing_status.elapsed.hour = '0' + machine.playing_status.elapsed.hour;
             }
        }
    }

    // Display status
    var template = Handlebars.compile(document.getElementById("playing_template").innerHTML);
    var html = template(machine.playing_status);
    $("#playing").html(html);

    // Display modal if needed
    $("#playing_modal").modal({backdrop: 'static', keyboard: false});

}
window.setInterval(loop_while_playing, 1000);

// Open the tuning tools panel
function tuningTools() {
    // List of settings
    var settings = [
        {
            id: 'speed',
            title: 'Speed multiplier',
            unit: '%',
            values: [10, 20, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200, 300, 400],
            gcode: ["M220", "S"]
        },
        {
            id: 'extrusion',
            title: 'Extrusion multiplier',
            unit: '%',
            values: [10, 20, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200, 300, 400],
            gcode: ["M221", "S"]
        },
        {
            id: 'acceleration',
            title: 'Acceleration',
            unit: 'mm/s²',
            values: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
            gcode: ["M204", "S"]
        },
        {
            id: 'junction_deviation',
            title: 'Junction deviation',
            unit: 'units',
            values: [0.0001, 0.001, 0.01, 0.1],
            gcode: ["M205", "X"]
        },
    ];
    // Get current values
    $.each(settings, function (index) {
        settings[index].value = machine.config_override[this.gcode[0]][this.gcode[1]];
    });
    // Display template
    var template = Handlebars.compile(document.getElementById("tuning_tools_template").innerHTML);
    var html = template({settings: settings});
    $("#playing_tools").html(html).slideDown();
}

function getCommandState(cmd, data) {
    var state = {answer: 'success', icon: 'ok'};
    if (cmd.match(/^(ls|cd|pwd)/)) {
        state.icon = 'duplicate';
    }
    if (cmd.match(/^help/)) {
        state.icon = 'info-sign';
    }
    if (cmd.match(/^cat/)) {
        state.icon = 'file';
    }
    if (cmd.match(/^play/)) {
        state.icon = 'play';
    }
    if (cmd.match(/^progress/)) {
        state.icon = 'time';
    }
    if (cmd.match(/^abort/)) {
        state.icon = 'folder-remove';
        state.answer = 'warning';
    }
    if (cmd.match(/^mem/)) {
        state.icon = 'hdd';
    }
    if (cmd.match(/^(break|dfu)/)) {
        state.icon = 'scissors';
        state.answer = 'warning';
    }
    if (cmd.match(/^net/)) {
        state.icon = 'earphone';
    }
    if (cmd.match(/^rm/)) {
        state.icon = 'floppy-remove';
        state.answer = 'warning';
    }
    if (cmd.match(/^suspend/)) {
        state.icon = 'pause';
    }
    if (cmd.match(/^resume/)) {
        state.icon = 'play';
    }
    if (cmd.match(/^thermistors/)) {
        state.icon = 'scale';
    }
    if (cmd.match(/^fire/)) {
        state.icon = 'fire';
        state.answer = 'warning';
    }
    if (cmd.match(/^config/)) {
        state.icon = 'th-list';
    }
    if (cmd.match(/^remount/)) {
        state.icon = 'repeat';
    }
    if (cmd.match(/^reset/)) {
        state.icon = 'repeat';
        state.answer = 'warning';
    }
    if (cmd.match(/^version/)) {
        state.icon = 'ice-lolly-tasted';
    }
    if (cmd.match(/^get/)) {
        state.icon = 'arrow-down';
    }
    if (cmd.match(/^set/)) {
        state.icon = 'arrow-up';
    }
    if (cmd.match(/^switch/)) {
        state.icon = 'transfer';
    }
    if (cmd.match(/^md5sum/)) {
        state.icon = 'stats';
    }

    return state;
}

function setTemp(module, temperature) {
    alert(module + " " + temperature);
}

function jump() {
    //Open modal
    $("#jumping_modal").modal();
    // Get machine dimensions
    var alpha_min = 0;
    if (machine.config.root.alpha_min != undefined) {
        alpha_min = machine.config.root.alpha_min;
    }
    var alpha_max = 200;
    if (machine.config.root.alpha_max != undefined) {
        alpha_max = machine.config.root.alpha_max;
    }
    var beta_min = 0;
    if (machine.config.root.beta_min != undefined) {
        beta_min = machine.config.root.beta_min;
    }
    var beta_max = 200;
    if (machine.config.root.beta_max != undefined) {
        beta_max = machine.config.root.beta_max;
    }
    var gamma_min = 0;
    if (machine.config.root.gamma_min != undefined) {
        gamma_min = machine.config.root.gamma_min;
    }
    var gamma_max = 200;
    if (machine.config.root.gamma_max != undefined) {
        gamma_max = machine.config.root.gamma_max;
    }
    var x_size = alpha_max - alpha_min;
    var y_size = beta_max - beta_min;
    var z_size = gamma_max - gamma_min;

    // Set dimensions based on machine size
    var width = 800;
    var height = width * (x_size / y_size);

    // Set up canvas
    var canvas = new fabric.Canvas('jumping_canvas');

    $("#jumping_canvas").width = width;
    $("#jumping_canvas").height = height;

    // create a rectangle object
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);


}
