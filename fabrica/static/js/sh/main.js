// smoothie-happy alias
var ip = '192.168.1.101';

//------------------------------------------------------------------------------

// // send command(s)
// sh.network.command(ip, 'version\nmem\nversion', {
//     onload: function() {
//         console.info('version', this);
//     }
// });

//------------------------------------------------------------------------------

// // get config value
// sh.config.get(ip, 'alpha_steps_per_mm', {
//     location: 'sd',
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // set config value
// sh.config.set(ip, 'alpha_steps_per_mm', '90', {
//     location: 'sd',
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // config cache load/unload/dump
// sh.config.cache(ip, 'dump', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // load config cache
// sh.config.cacheLoad(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // unload config cache
// sh.config.cacheUnload(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // dump config cache
// sh.config.cacheDump(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // saves a configuration override file
// // as specified filename or as config-override
// sh.config.save(ip, '/', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // load a configuration override file
// // from specified filename or from config-override
// sh.config.load(ip, '/', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// get entire config
// sh.config.getAll(ip, {
//     //limit: 20,
//     onresponse: function(response) {
//         console.info('response', response);
//         var item = response.result.get('mm_per_arc_segment');
//         console.info('mm_per_arc_segment: ', item);
//     }
// });

function parseAndFormatConfig() {
    var rawConfig      = $('#config').text();
    var parsedConfig   = sh.config.parse(rawConfig);
    parsedConfig.set('gamma_steps_per_mm', 1000); // force to fixed value
    var formatedConfig = sh.config.format(parsedConfig);
    $('#formatedConfig').text(formatedConfig);
    return parsedConfig;
}

$('#config').on('keyup', parseAndFormatConfig);
console.log(parseAndFormatConfig());

//------------------------------------------------------------------------------

// // get files list on the sd card
// sh.command.ls(ip, 'sd/', {
//     onresponse: function(response) {
//         console.info('ls sd/', response);
//     }
// });

// // get files list on the sd card
// sh.command.ls(ip, '/sd/', {
//     onresponse: function(response) {
//         console.info('ls sd/', response);
//     }
// });

// // change the current folder
// sh.command.cd(ip, 'sd/', {
//     onresponse: function(response) {
//         console.info('cd sd/', response);
//     }
// });

// // get working directory
// sh.command.pwd(ip, {
//     onresponse: function(response) {
//         console.info('pwd', response);
//     }
// });

// // get the first 10 lines from the config file
// sh.command.cat(ip, 'sd/config.txt', {
//     limit     : 10,
//     onresponse: function(response) {
//         console.info('cat sd/config.txt', response);
//     }
// });

// // remove a file
// sh.command.rm(ip, '/sd/test.txt', {
//     onresponse: function(response) {
//         console.info('rm gcode/test.txt', response);
//     }
// });

// // move a file
// sh.command.mv(ip, '/sd/gcode/test.txt', '/sd/test.txt', {
//     onresponse: function(response) {
//         console.info('rm gcode/test.txt', response);
//     }
// });

// // get the help
// sh.command.help(ip, {
//     onresponse: function(response) {
//         console.info('help', response);
//     }
// });

// // get the board version
// sh.command.version(ip, {
//     onresponse: function(response) {
//         console.info('version', response);
//     }
// });

// // get memory usage
// sh.command.mem(ip, {
//     onresponse: function(response) {
//         console.info('mem', response);
//     }
// });

// // wait until the board is online
// sh.network.waitUntilOnline(ip, {
//     ontry: function(trials) {
//         console.info('ontry', trials);
//     },
//     online: function(version) {
//         console.info('online', version);
//     },
//     ontimeout: function() {
//         console.info('ontimeout', this);
//     }
// });

// // reset the system
// sh.command.reset(ip, {
//     onresponse: function(response) {
//         console.info('reset:onresponse', response);
//     },
//     onerror: function() {
//         console.info('reset:onerror', this);
//     },
//     waitUntilOnline: {
//         ontry: function(trials) {
//             console.info('waitUntilOnline:ontry', trials);
//         },
//         online: function(version) {
//             console.info('waitUntilOnline:online', version);
//         },
//         ontimeout: function() {
//             console.info('waitUntilOnline:offline', this);
//         }
//     }
// });

// // get input value checksum
// sh.command.checksum(ip, 'my_config_item', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get raw [temp|pos|wcs|state|status|fk|ik]
// sh.command.get(ip, 'temp', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // set temperatures
// sh.command.tempSet(ip, 'bed', 50, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get temperatures
// sh.command.tempGet(ip, {
//     device: 'bed',
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // set temperatures
// sh.command.temp(ip, 'bed', 80, {
//     onresponse: function(response) {
//         console.info('response', response);
//         // get temperatures
//         sh.command.temp(ip, {
//             device: 'bed',
//             onresponse: function(response) {
//                 console.info('response', response);
//             }
//         });
//     }
// });

// // get position
// sh.command.position(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get work coordinate system
// sh.command.wcs(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get state
// sh.command.state(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get status
// sh.command.status(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // do inverse kinematics on the given cartesian position,
// // optionally moves the actuators and finaly display the coordinates.
// sh.command.kinematics(ip, {
//     //inverse: false,
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // switch
// sh.command.switch(ip, 'fan', 'on', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get network config
// sh.command.net(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // remount
// sh.command.remount(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // calculate the Steinhart Hart coefficients for a thermistor
// sh.command.thermistorCalc(ip, '25000,5,10000,25,4000,45', {
//     storeto: 0, save: true,
//     onresponse: function(response) {
//         console.info('response', response);
//     },
//     onsave: function(response) {
//         console.info('response', response);
//     }
// });

// // get the predefined thermistors.
// sh.command.thermistors(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get md5 sum of the given file.
// sh.command.md5sum(ip, '/sd/config.txt', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // play a gcode file
// sh.command.play(ip, '/sd/gcode/triangle.gcode', {
//     verbose: true,
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // remove file
// sh.command.rm(ip, '/sd/gcode/triangle.gcode', {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // get progress of current play
// setTimeout(function() {
//     sh.command.progress(ip, {
//         onresponse: function(response) {
//             console.info('response', response);
//         }
//     });
// }, 2000);

// // abort currently playing file
// sh.command.abort(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // suspend a print in progress
// sh.command.suspend(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // resume the suspended print
// sh.command.resume(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // reset alarm
// sh.command.resetAlarm(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     }
// });

// // send ok
// sh.command.ok(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     },
//     ontimeout: function() {
//         console.info('timeout', this);
//     }
// });

// // send ping
// sh.command.ping(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     },
//     ontimeout: function() {
//         console.info('timeout', this);
//     }
// });

//------------------------------------------------------------------------------

// // scan the network looking for some Smoothie boards
// sh.scanner.scan('192.168.1.100-105', {
//     onstart: function(queue) {
//         console.info('start', queue);
//     },
//     onprogress: function(ip, board) {
//         console.info('progress', ip, board);
//     },
//     onboard: function(board) {
//         console.info('board', board);
//     }
// });

//------------------------------------------------------------------------------

// // update edge firmware commits from the git
// sh.firmware.getCommits({
//     onresponse: function(response) {
//         console.info('response', response);
//         var pos = sh.firmware.getCommitPosition('087897f');
//         console.info('087897f is behind ', pos, ' commitments');
//     }
// });

// // get last edge firmware
// sh.firmware.getFirmware({
//     onresponse: function(response) {
//         console.info('response', response);
//         saveAs(response.result.data, response.result.name);
//     }
// });

// // update the firmware
// sh.firmware.update(ip, {
//     onresponse: function(response) {
//         console.info('response', response);
//     },
//     onerror: function() {
//         console.info('error', this);
//     },
//     ontimeout: function() {
//         console.info('timeout', this);
//     },
//     waitUntilOnline: {
//         ontry: function(trials) {
//             console.info('waitUntilOnline:ontry', trials);
//         },
//         online: function(version) {
//             console.info('waitUntilOnline:online', version);
//         },
//         ontimeout: function() {
//             console.info('waitUntilOnline:offline', this);
//         }
//     }
// });

// // upgrade the configuration file
// sh.firmware.upgradeConfig(ip, {
//     onresponse: function(response) {
//         console.info('response', response.result);
//     }
// });

//------------------------------------------------------------------------------

// // on file selected
// $('#file').on('change', function(e) {
//     var file = e.target.files[0];
//
//     // upload the file
//     sh.command.upload(ip, file, {
//         upload: {
//             onloadend: function(event) {
//                 sh.command.ls(ip, 'sd/', {
//                     onresponse: function(response) {
//                         console.info('files', response.data.files);
//                     }
//                 });
//             }
//         }
//     });
// });

//------------------------------------------------------------------------------

// debug...
//console.info('sh', sh);
