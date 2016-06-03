/**
* Smoothie-Happy global namespace.
* @namespace
*/
var sh = sh || {};

(function () {
    'use strict';

    // -------------------------------------------------------------------------

    /**
    * @readonly
    * @property {String} name API name.
    */
    sh.name = 'smoothie-happy';

    /**
    * @readonly
    * @property {String} version API version.
    */
    sh.version = '0.0.1-alpha';

    /**
    * @readonly
    * @property {String} description API description.
    */
    sh.description = 'Smoothieware network communication API.';

    /**
    * @readonly
    * @property {String} link API link.
    */
    sh.link = 'https://github.com/lautr3k/Smoothie-Happy';

    // -------------------------------------------------------------------------

    /**
    * Network module.
    * @namespace
    */
    sh.network = {
        /**
        * @property {Integer} timeout Default timeout for all request (ms).
        * @default  5000
        */
        timeout: 5000
    };

    /**
    * XMLHttpRequest wrapper.
    * @method sh.network.request
    * @param  {String}  type              'GET' or 'POST'.
    * @param  {String}  url               URL with protocol.
    * @param  {Object}  settings          Request settings.
    * @param  {Mixed}   settings.data     Data to send with the request.
    * @param  {Object}  settings.headers  Headers to send with the request.
    * @param  {Object}  settings.options  {XMLHttpRequest} properties/methods to overwrite.
    * @return {XMLHttpRequest}
    */
    sh.network.request = function(type, url, settings) {
        // force type to uppercase
        type = type.toUpperCase();

        // defaults settings
        settings = settings || {};

        var data     = settings.data    || null;
        var headers  = settings.headers || {};
        var options  = settings.options || settings;

        // http request object
        var xhr = new XMLHttpRequest();

        // open the request
        xhr.open(type, url, true);

        // set default xhr properties
        options.timeout = options.timeout || this.timeout;

        // set user xhr properties
        for (var key in options) {
            if (key === 'upload') {
                for (var event in options[key]) {
                    if (xhr.upload[event] !== undefined) {
                        xhr.upload[event] = options[key][event];
                    }
                }
            }
            else if (xhr[key] !== undefined) {
                xhr[key] = options[key];
            }
        }

        // append data to url on GET request
        if (type === 'GET' && data) {
            url += data;
            data = null;
        }

        // set custom headers
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        // send the request
        xhr.send(type === 'POST' ? data : null);

        // return the request object
        return xhr;
    };

    /**
    * GET request.
    * @method sh.network.get
    * @param  {String}  url       URL with protocol.
    * @param  {Object}  settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.network.get = function(url, settings) {
        return this.request('GET', url, settings);
    };

    /**
    * POST request.
    * @method sh.network.post
    * @param  {String}  url       URL with protocol.
    * @param  {Object}  settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.network.post = function(url, settings) {
        return this.request('POST', url, settings);
    };

    /**
    * Upload a file on the sd card.
    * @method sh.network.upload
    * @param  {String}       ip        Board ip.
    * @param  {Object|File}  file      {File} object or an {Object} with "name" and "data" properties set.
    * @param  {Object}       settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.network.upload = function(ip, file, settings) {
        // defaults settings
        settings = settings || {};

        // file is a string, convert to Blob
        if (typeof file === 'string') {
            file = new Blob([file], { 'type': 'text/plain' });
        }

        // file is a File or Blob object, wrap it...
        if (file instanceof File || file instanceof Blob) {
            file = {
                name: file.name,
                data: file
            }
        }

        // set file data
        settings.data = file.data;

        // set file name header
        settings.headers = { 'X-Filename': file.name };

        // send the command as post request
        return this.post('http://' + ip + '/upload', settings);
    };

    /**
    * Send a raw command.
    * @method sh.network.command
    * @param  {String}                       ip                   Board ip.
    * @param  {String}                       command              The command string. See {@link http://smoothieware.org/console-commands} for a complete list.
    * @param  {Object}                       settings             See "{@link sh.network.request}.settings".
    * @param  {sh.network.responseCallback}  settings.onresponse  Function called when the response is received.
    * @param  {sh.network.parserCallback}    settings.parser      Function that parses the response.
    * @return {XMLHttpRequest}
    */
    sh.network.command = function(ip, command, settings) {
        // defaults settings
        settings = settings || {};

        // default callbacks
        settings.onresponse = settings.onresponse || function() {};
        settings.parser     = settings.parser     || function(responseText) {
            return responseText.trim().split('\n');
        };

        // internal onload callback
        settings.onload = function(event) {
            // parse the response
            var result = settings.parser.call(this, this.responseText);

            // response object
            var response = { error: null, result: result };

            // result type check
            if (typeof result !== 'object') {
                if (typeof result === 'string') {
                    // error message provided
                    response.error  = result.trim();
                    response.result = null;
                }
                else if (result !== true) {
                    // unknown error message
                    response.error = 'Unknown error';
                    response.result = null;
                }
            }

            // call user callbacks
            settings.onresponse.call(this, response);
        };

        // set the command as request data
        settings.data = command.trim() + '\n';

        // send the command as post request
        return this.post('http://' + ip + '/command', settings);
    };

    /**
    * Callback called by {@link sh.network.command} that parses the raw response.
    * @callback sh.network.parserCallback
    * @param    {String} responseText The raw response text provided by the {XMLHttpRequest}
    * @return   {Mixed}  The response parsed as an object or TRUE if no data. FALSE if an error occure.
    */

    /**
    * Callback called by {@link sh.network.command} when the response is parsed.
    * @callback sh.network.responseCallback
    * @param    {Object} response Arbitrary object that represents the response.
    */

    /**
    * Wait until the board is online.
    * @method sh.network.waitUntilOnline
    * @param  {String}                     ip                 Board ip.
    * @param  {Object}                     settings           See "{@link sh.network.command}.settings".
    * @param  {Integer}                    settings.limit     Maximum number of trials {@default 10}.
    * @param  {Integer}                    settings.interval  Interval between trials in milliseconds {@default 2000}.
    * @param  {sh.network.onlineCallback}  settings.online    Called when the board is online.
    * @param  {sh.network.ontryCallback}   settings.ontry     Called when we try to connect with the board.
    * @return {XMLHttpRequest}
    */
    sh.network.waitUntilOnline = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // request timeout
        settings.timeout = settings.timeout || 1000;

        // trials limit
        settings.limit = settings.limit || 10;

        // interval between trials
        settings.interval = settings.interval || 2000;

        // online callback
        settings.online = settings.online || null;

        // ontry callback
        settings.ontry = settings.ontry || null;

        // user callbacks
        var ontimeout  = settings.ontimeout  || null;
        var onresponse = settings.onresponse || null;

        // trials counter
        settings.trials = settings.trials || 1;

        // on connection timeout
        settings.ontimeout = settings.onerror = function() {
            // increment trials counter
            settings.trials++;

            // if limit is reached
            if (settings.trials > settings.limit) {
                ontimeout.call(this);
                return;
            }

            // delay next try
            setTimeout(function() {
                sh.network.waitUntilOnline(ip, settings);
            }, settings.interval);
        };

        // on response
        settings.onresponse = function(response) {
            // call default user callback
            if (onresponse) {
                onresponse.call(this, response);
                onresponse = null;
            }

            // if online callback defined and version data
            if (settings.online && response.result.branch) {
                settings.online.call(this, response.result);
                settings.online = null;
            }
        };

        // send version command
        var xhr = sh.command.version(ip, settings);

        // on try callback ?
        if (settings.ontry) {
            settings.ontry.call(xhr, settings.trials);
        }

        // return the request Object
        return xhr;
    };

    /**
    * Callback called by {@link sh.network.waitUntilOnline} when the board is online.
    * @callback sh.network.onlineCallback
    * @param    {Object} board Board info (result of version cmd).
    */

    /**
    * Callback called by {@link sh.network.waitUntilOnline} when we try to connect with the board.
    * @callback sh.network.ontryCallback
    * @param    {Integer} trials Number of trials.
    */

    // -------------------------------------------------------------------------

    /**
    * Configuration module.
    * @namespace
    */
    sh.config = {};

    /**
    * Parse raw configuration.
    * @method sh.config.parse
    * @param  {String}  raw  Raw configuration.
    * @return {Object}  ...
    */
    sh.config.parse = function(raw) {
        // split response text on new lines
        var lines = raw.trim().split('\n');

        // extract sections
        var line, section, matches, name, value, disabled, comments;
        var sections = [], items = {};

        for (var i = 0, il = lines.length; i < il; i++) {
            // current line
            line = lines[i];

            // section comments
            if (line[0] === '#' && line[1] === ' ') {
                // first line
                if (! section) {
                    section = {
                        comments : [],
                        items    : {},
                        maxLength: {
                            name : 0,
                            value: 0
                        }
                    };
                }

                // push comment line
                section.comments.push(line.substr(2).trim());
                continue;
            }

            // end of file or section
            if (i == il - 1 || (lines[i + 1][0] === '#' && lines[i + 1][1] === ' ')) {
                sections.push(section);
                section = null;
                continue;
            }

            // item comment, append to last item comment
            if (name && line[0] === ' ') {
                var item = section.items[name];
                item.comments.push(line.trim().replace(/^# */, ''));
                continue;
            }

            // disabled item (commented)
            disabled = line[0] === '#';

            if (disabled) {
                line = line.replace(/^#+ */, '');
            }

            // extracts [name, value, comment]
            matches = line.trim().match(/([^ ]+) +([^ ]+) *(.*)?/);

            if (matches) {
                name     = matches[1];
                value    = matches[2];
                comments = matches[3] ? matches[3].substr(1).trim() : '';

                section.items[name] = {
                    name    : name,
                    value   : value,
                    disabled: disabled,
                    comments: [comments]
                };

                items[name] = sections.length;

                section.maxLength.name  = Math.max(section.maxLength.name , name.length);
                section.maxLength.value = Math.max(section.maxLength.value, value.length);
            }

        }

        // return result
        return {
            sections: sections,
            lines   : lines,
            items   : items,

            get: function(name) {
                if (items[name] === undefined
                || sections[items[name]] === undefined
                || sections[items[name]].items[name] === undefined) {
                    return null;
                }

                return sections[items[name]].items[name];
            },

            set: function(name, value) {
                if (! this.get(name)) {
                    throw new Error('Undefined config item: ' + name);
                }

                var section = sections[items[name]];

                section.maxLength.value   = 0;
                section.items[name].value = value + '';

                for (var n in section.items) {
                    section.maxLength.value = Math.max(
                        section.maxLength.value, section.items[n].value.length
                    );
                }

                return section.items[name].value;
            }
        };
    };

    function wordwrap (str, int_width, str_break, cut) {
        //  discuss at: http://phpjs.org/functions/wordwrap/
        // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // improved by: Nick Callen
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Sakimori
        //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // bugfixed by: Michael Grier
        // bugfixed by: Feras ALHAEK
        //   example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
        //   returns 1: 'Kevin |van |Zonnev|eld'
        //   example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
        //   returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
        //   example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        //   returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'

        var m = ((arguments.length >= 2) ? arguments[1] : 75)
        var b = ((arguments.length >= 3) ? arguments[2] : '\n')
        var c = ((arguments.length >= 4) ? arguments[3] : false)

        var i, j, l, s, r

        str += ''

        if (m < 1) {
            return str
        }

        for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
            for (s = r[i], r[i] = ''; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : '')) {
                j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/))[0].length
            }
        }

        return r.join('\n')
    }

    /**
    * Format parsed configuration.
    * @method sh.config.format
    * @param  {Object}  config  Configuration object provided by {@link sh.config.parse}.
    * @return {String}  Formatted configuration file.
    */
    sh.config.format = function(config, settings) {
        // default settings
        settings = settings || {};

        // maximum line length
        var maxLineLength = (settings.maxLineLength || 132) - 3;

        // extra paddings
        var paddings = settings.paddings || {};

        paddings.afterName  = paddings.afterName  || 5;
        paddings.afterValue = paddings.afterValue || 5;

        // align disabled item
        var alignDisabledComments = settings.alignDisabledComments || true;

        // add title spacers
        var titleSpacers = settings.titleSpacers || true;

        if (titleSpacers) {
            if (typeof titleSpacers !== 'string') {
                titleSpacers = '-';
            }
            titleSpacers = '# ' + Array(maxLineLength + 1).join(titleSpacers) + '\n';
        }

        // for each section
        var i, il, j, jl, section, comment, maxLength, name, line, item, pads, buffer = '';

        for (i = 0, il = config.sections.length; i < il; i++) {
            // current section
            section = config.sections[i];

            // maximum item name length
            maxLength = section.maxLength;

            // title spacers
            if (titleSpacers) {
                // append title spacers
                buffer += titleSpacers;
            }

            // for each comments line
            for (j = 0, jl = section.comments.length; j < jl; j++) {
                // word wrap comment
                comment = section.comments[j];
                comment = wordwrap(comment, maxLineLength, '\n# ', true);

                // append comment line to buffer
                buffer += '# ' + comment + '\n';
            }

            // title spacers
            if (titleSpacers) {
                // append title spacers
                buffer += titleSpacers;
            }

            // for each item
            for (name in section.items) {
                // current item line
                line = '';

                // current item
                item = section.items[name];

                // disabled item
                if (item.disabled) {
                    // append comment char to buffer
                    line += '#';
                }

                // append item name to buffer
                line += item.name;

                // [name <--> value] padding
                pads  = maxLength.name - item.name.length + paddings.afterName;
                pads += maxLength.value - item.value.length + 1;

                if (item.disabled && alignDisabledComments) {
                    pads--;
                }

                // append padding spaces
                line += Array(pads).join(' ');

                // append item value to buffer
                line += item.value;

                // value paddings
                pads = paddings.afterValue + 1;

                // append padding spaces
                line += Array(pads).join(' ');

                // comment
                comment = item.comments.join(' ');

                // wordwrap
                pads    = maxLength.name + paddings.afterName;
                pads   += maxLength.value + paddings.afterValue + 1;
                comment = wordwrap(comment, maxLineLength - pads, '\n' + Array(pads).join(' ') + '# ', true);

                // append item comment to buffer
                line += '# ' + comment + '\n';

                // end of item
                buffer += line;
            }

            // end of section
            buffer += '\n';
        }

        return buffer;
    };

    /**
    * Upgrade the configuration file.
    * @method sh.config.upgrade
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.upgrade = function(ip, settings) {
        // defauls settings
        settings = settings || {};

        // local and remote file path
        var localFilename  = settings.filename       || '/sd/config.txt';
        var remoteFilename = settings.remoteFilename || 'config';
        var remoteBaseUrl  = settings.remoteUrl      || sh.firmware.git.url.raw + 'edge/ConfigSamples/Smoothieboard/';

        settings.onresponse = function(response) {
            console.log(response);
        };

        // get the configuration from sd card
        return sh.config.getAll(ip, settings);
    };

    /**
    * Get configuration from file.
    * @method sh.config.getAll
    * @param  {String}  ip                 Board ip.
    * @param  {Object}  settings           See "{@link sh.network.command}.settings".
    * @param  {Mixed}   settings.timeout   Connexion timeout {@default 60000}.
    * @param  {Mixed}   settings.filename  Configuration filename relative to sd card root directory {@default 'config.txt'}.
    * @return {XMLHttpRequest}
    */
    sh.config.getAll = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set default timeout to 60s
        settings.timeout = settings.timeout || 60000;

        // set default filename
        var filename = settings.filename || 'config.txt';

        // default response parser callback
        settings.parser = settings.parser || sh.config.parse;

        // send the command
        return sh.command.cat(ip, '/sd/' + filename, settings);
    };

    /**
    * Get config value.
    * @method sh.config.get
    * @param  {String}  ip                 Board ip.
    * @param  {String}  [name]             Setting name, if not set return all items (take long time).
    * @param  {Object}  settings           See "{@link sh.network.command}.settings".
    * @param  {String}  settings.location  Where to read the value {@default 'sd'}.
    * @return {XMLHttpRequest}
    */
    sh.config.get = function(ip, name, settings) {
        // get all
        if (arguments.length < 3) {
            return sh.config.getAll(ip, name); // name = settings
        }

        // defaults settings
        settings = settings || {};

        // set config location
        var location = settings.location || 'sd';

        if (location.length) {
            location = location + ' ';
        }

        // set the command
        var command = 'config-get ' + location + name;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('is not in config') !== -1) {
                return raw;
            }

            if (raw.length) {
                return { value: raw.split(' ').pop() };
            }

            return 'invalid location';
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Set config value.
    * @method sh.config.set
    * @param  {String}  ip                 Board ip.
    * @param  {String}  name               Setting name.
    * @param  {String}  value              Setting value.
    * @param  {Object}  settings           See "{@link sh.network.command}.settings".
    * @param  {String}  settings.location  Where to write the value {@default 'sd'}.
    * @return {XMLHttpRequest}
    */
    sh.config.set = function(ip, name, value, settings) {
        // defaults settings
        settings = settings || {};

        // set config location
        var location = settings.location || 'sd';

        if (location.length) {
            location = location + ' ';
        }

        // set the command
        var command = 'config-set ' + location + name + ' ' + value;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('not enough space to overwrite existing key/value') !== -1) {
                return raw;
            }

            if (raw.length) {
                return { value: raw.split(' ').pop() };
            }

            return 'invalid location';
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Saves a configuration override file as specified filename or as config-override.
    * @method sh.config.save
    * @param  {String}  ip          Board ip.
    * @param  {String}  [filename]  Target config-override filename.
    * @param  {Object}  settings    See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.save = function(ip, filename, settings) {
        if (arguments.length === 2) {
            settings = filename;
            filename = '/';
        }

        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'save ' + filename;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { message: raw.trim() };
        };

        // send the command
        return sh.network.command(ip, command, settings);
    };

    /**
    * loads a configuration override file from specified name or config-override.
    * @method sh.config.load
    * @param  {String}  ip          Board ip.
    * @param  {String}  [filename]  Target config-override filename.
    * @param  {Object}  settings    See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.load = function(ip, filename, settings) {
        if (arguments.length === 2) {
            settings = filename;
            filename = '/';
        }

        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'load ' + filename;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('File not found') === 0) {
                return raw;
            }

            var lines   = raw.split('\n');
            var message = lines.shift() + ' ' + lines.pop() + '.';

            return { message: message, lines: lines };
        };

        // send the command
        return sh.network.command(ip, command, settings);
    };

    /**
    * Load/unload/dump configuration cache.
    * @method sh.config.cache
    * @param  {String}  ip        Board ip.
    * @param  {String}  action    Possible values [load|unload|dump].
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.cache = function(ip, action, settings) {
        // defaults settings
        settings = settings || {};

        if (action === 'dump') {
            // set default timeout to 60s
            settings.timeout = settings.timeout || 60000;
        }

        // set the command
        var command = 'config-load ' + action;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('unsupported option') === 0 || action === 'checksum') {
                return 'unsupported option: must be one of load|unload|dump';
            }

            if (action === 'load' || action === 'unload') {
                return { message: raw };
            }

            return { lines: raw.split('\n') };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Load configuration cache.
    * @method sh.config.cacheLoad
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.cacheLoad = function(ip, settings) {
        return sh.config.cache(ip, 'load', settings);
    };

    /**
    * Unload configuration cache.
    * @method sh.config.cacheUnload
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.cacheUnload = function(ip, settings) {
        return sh.config.cache(ip, 'unload', settings);
    };

    /**
    * Dump configuration cache.
    * @method sh.config.cacheDump
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.config.cacheDump = function(ip, settings) {
        return sh.config.cache(ip, 'dump', settings);
    };

    // -------------------------------------------------------------------------

    /**
    * Firmware module.
    * @namespace
    */
    sh.firmware = {
        /**
        * @property {Object} edge         Edge related commits information.
        * @property {Object} edge.update  Collection update time.
        * @property {Object} edge.commits Collection of commits 'hash:position'.
        */
        edge: {
            update : 0,
            commits: {}
        },
        git: {
            url: {
                api: 'https://api.github.com/repos/Smoothieware/Smoothieware/',
                raw: 'https://raw.githubusercontent.com/Smoothieware/Smoothieware/'
            }
        }
    };

    /**
    * Get last (30) commits from the git.
    * @method sh.firmware.getCommits
    * @param  {Object}                       settings             See "{@link sh.network.request}.settings".
    * @param  {sh.network.responseCallback}  settings.onresponse  Function called when the response is received.
    * @return {XMLHttpRequest}
    */
    sh.firmware.getCommits = function(settings) {
        // firmware repo url
        var url  = sh.firmware.git.url.api + 'commits';
        var data = '?sha=edge&path=FirmwareBin/firmware.bin';

        // commits collection
        var commits = {};

        // default settings
        settings = settings || {};

        // set request data
        settings.data = data;

        // on response callback
        settings.onresponse = settings.onresponse || function() {};

        // response object
        var response = { error: 'Empty response', result: null };

        // onload callback
        settings.onload = settings.onload || function() {
            // get the response text (JSON)
            var json = this.responseText;

            // empty response
            if (!json.length) {
                return response;
            }

            // parse JSON
            var items = JSON.parse(json);

            // empty response
            if (!items.length) {
                return response;
            }

            // extract commits hash and position
            for (var commits = {}, i = 0, il = items.length; i < il; i++) {
                commits[items[i].parents[0].sha.substr(0, 7)] = i;
            }

            // response
            response.error  = null;
            response.result = commits;

            // save as global
            sh.firmware.edge.commits = commits;
            sh.firmware.edge.update  = Date.now();

            // call user callbacks
            settings.onresponse.call(this, response);
        };

        // send the request
        return sh.network.get(url, settings);
    };

    /**
    * Get version position.
    * @method sh.firmware.getCommitPosition
    * @param  {String}   hash  Commit hash to get position.
    * @return {Integer}  Return -1 if not found or the position if found, `[0 = firmware is up to date]`.
    */
    sh.firmware.getCommitPosition = function(hash) {
        if (this.edge.commits[hash] === undefined) {
            return -1;
        }
        return parseInt(this.edge.commits[hash]);
    };

    /**
    * Get last (edge) firmware as {Blob}.
    * @method sh.firmware.getFirmware
    * @param  {Object}                       settings             See "{@link sh.network.request}.settings".
    * @param  {sh.network.responseCallback}  settings.onresponse  Function called when the response is received.
    * @return {XMLHttpRequest}
    */
    sh.firmware.getFirmware = function(settings) {
        var url = sh.firmware.git.url.raw + 'edge/FirmwareBin/firmware.bin';

        // default settings
        settings = settings || {};

        // set response type
        settings.responseType = 'blob';

        // set request data
        settings.timeout = settings.timeout || (1000 * 15);

        // on response callback
        settings.onresponse = settings.onresponse || function() {};

        // response object
        var response = { error: 'Empty response', result: null };

        // onload callback
        settings.onload = settings.onload || function() {
            var blob = this.response || null;

            if (!blob instanceof Blob) {
                return response;
            }

            response.error  = null;
            response.result = { name: 'firmware.bin', data: blob };

            settings.onresponse.call(this, response);
        };

        return sh.network.get(url, settings);
    };

    /**
    * Update the firmware.
    * @method sh.firmware.update
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.firmware.update = function(ip, settings) {
        // defauls settings
        settings = settings || {};

        // first action name
        var action = 'download';

        // old user defined timeout
        var timeout = settings.timeout || 2000;

        // user callback
        var onresponse = settings.onresponse || function() {};

        // on response
        settings.onresponse = function(response) {
            // set action name
            response.action = action;

            // call user callback
            onresponse.call(this, response);

            // call next action
            if (action === 'download') {
                // next action name
                action = 'upload';

                // file to upload
                var file = response.result;

                // set bigger timeout for upload
                settings.timeout = 60000;

                // upload the firmware
                sh.command.upload(ip, file, settings);
            }
            else if (action === 'upload') {
                // next action name
                action = 'reset';

                // reset default timeout
                settings.timeout = timeout;

                // reset responseType (set to 'blob' by upload command)
                settings.responseType = 'text';

                // reset the board
                sh.command.reset(ip, settings);
            }
        };

        // download last firmware
        return sh.firmware.getFirmware(settings);
    };

    // -------------------------------------------------------------------------

    /**
    * Scanner module.
    * @namespace
    */
    sh.scanner = {
        /**
        * @property  {String}  input  Input to scan.
        * @default   192.168.1.*.
        */
        input: '192.168.1.*',

        /**
        * @property  {Integer}  timeout  Default response timeout in milliseconds.
        * @default 1000
        */
        timeout: 1000,

        /**
        * @readonly
        * @property {Boolean} scanning Is scanning.
        */
        scanning: false,

        /**
        * @readonly
        * @property {Integer} scanned Number of ip scanned.
        */
        scanned: 0,

        /**
        * @readonly
        * @property {String} total Total number of ip to scan.
        */
        total: 0,

        /**
        * @readonly
        * @property {Integer} found Number of borads found.
        */
        found: 0,

        /**
        * @readonl
        * @property {Array} queue Ip's queue to scann.
        */
        queue: [],

        /**
        * @readonly
        * @property {Object} boards Known boards list.
        */
        boards: {},

        /**
        * @readonly
        * @property {Boolean} aborted Aborted scann status.
        */
        aborted: false
    };

    /**
    * Called when scan start.
    * @method sh.scanner.onstart
    * @param  {Array}  queue Ip's queue to scann.
    */
    sh.scanner.onstart = function(queue) {};

    /**
    * Called when board found.
    * @method sh.scanner.onboard
    * @param  {Object}  board Board version.
    */
    sh.scanner.onboard = function(board) {};

    /**
    * Called when scan progress.
    * @method sh.scanner.onprogress
    * @param  {String}  ip     Current ip.
    * @param  {Mixed}   board  Board version if found or null.
    */
    sh.scanner.onprogress = function(ip, board) {};

    /**
    * Called when abort scan.
    * @method sh.scanner.onabort
    */
    sh.scanner.onabort = function() {};

    /**
    * Called when resume scan.
    * @method sh.scanner.onresume
    */
    sh.scanner.onresume = function() {};

    /**
    * Called when scan stop.
    * @method sh.scanner.onstop
    */
    sh.scanner.onstop = function() {};

    /**
    * Called when scan end.
    * @method sh.scanner.onend
    * @param  {Integer}  found Number of boards found.
    */
    sh.scanner.onend = function(found) {};

    /**
    * Set scan timeout.
    * @method sh.scanner.setTimeout
    * @param  {Integer}     timeout  Scan timeout in milliseconds [min: 100, max: 2000].
    * @return {sh.scanner}  this     Chainable
    */
    sh.scanner.setTimeout = function(timeout) {
        // out of range test
        if (timeout < 100 || timeout > 2000) {
            throw new Error('Timeout is out of range [100, 2000].');
        }

        // set the timeout
        this.timeout = timeout;

        // return self
        return this;
    };

    /**
    * Set the input and compute the scan queue.
    *
    * **Allowed inputs :**
    * ```
    * - Wildcard  : '192.168.1.*'
    * - Single IP : '192.168.1.100'
    * - IP Range  : '192.168.1.100-120'
    * - Hostname  : 'my.smoothie.board'
    * - Mixed     : '192.168.1.100, my.smoothie.board'
    * - Array     : ['192.168.1.100-120', 'my.smoothie.board']
    * ```
    *
    * @method sh.scanner.setInput
    * @param  {String|Array}  input  Ip's scan pattern.
    * @return {sh.scanner}    this   Chainable
    */
    sh.scanner.setInput = function(input) {
        // reset queue
        this.queue = [];

        // input array
        var inputArray = input;

        // split input on comma if not an array
        if (typeof inputArray === 'string') {
            inputArray = inputArray.split(',');
        }

        // too short or not defined
        if (inputArray.length === 0) {
            throw new Error('Invalid input.');
        }

        // trim input parts
        inputArray = inputArray.map(function(part) {
            return part.trim();
        });

        // for each parts
        for (var y = 0, yl = inputArray.length; y < yl; y++) {
            // current part
            var currentInput = inputArray[y];

            // Wildcard | ex.: [192.168.1.*]
            if (/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.\*$/.test(currentInput)) {
                var currentInputParts = currentInput.split('.');
                currentInputParts.pop(); // remove last part (*)
                var baseIp = currentInputParts.join('.');
                for (var i = 0; i <= 255; i++) {
                    this.queue.push(baseIp + '.' + i);
                }
            }

            // Single ip | ex.: [192.168.1.55]
            else if (/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(currentInput)) {
                this.queue.push(currentInput);
            }

            // Ip's range | ex.: [192.168.1.50-100]
            else if (/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\-[0-9]{1,3}$/.test(currentInput)) {
                var currentInputParts = currentInput.split('.');
                var currentInputRange = currentInputParts.pop().split('-'); // last part (xxx-xxx)
                var baseIp     = currentInputParts.join('.');
                for (var i = currentInputRange[0], il = currentInputRange[1]; i <= il; i++) {
                    this.queue.push(baseIp + '.' + i);
                }
            }

            // Hostname | ex.: [www.host.name]
            else if (/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(currentInput)) {
                this.queue.push(currentInput);
            }

            // Invalid...
            else {
                throw new Error('Invalid input.');
            }
        }

        // set input
        this.input = input;

        // return self
        return this;
    };

    /**
    * Shift and scan an ip from the queue looking for a SmoothieBoard.
    * @method sh.scanner.processQueue
    * @protected
    */
    sh.scanner.processQueue = function() {
        // not in scan mode
        if (!this.scanning) {
            return false;
        }

        // shift first ip from the queue
        var ip = this.queue.shift();

        // end of queue
        if (! ip) {
            this.onend(this.found);
            this.scanning = false;
            return true;
        }

        // self alias
        var self  = this;

        // board object
        var board = null;

        // try to get the board version
        sh.command.version(ip, {
            // set default timeout
            timeout : self.timeout,

            // on response
            onresponse: function(response) {
                // board version info
                board = response.result;

                // increment found counter
                self.found++;

                // add/update the board
                self.boards[ip] = board;

                // notify board found
                self.onboard(board);
            },

            // in any case
            onloadend: function() {
                // increment scanned counter
                self.scanned++;

                // notify progression
                self.onprogress(ip, board);

                // scan next ip
                self.processQueue();
            }
        });
    };

    /**
    * Scan the network looking for some Smoothie boards.
    *
    * **Allowed inputs :**
    * ```
    * - Wildcard  : '192.168.1.*'
    * - Single IP : '192.168.1.100'
    * - IP Range  : '192.168.1.100-120'
    * - Hostname  : 'my.smoothie.board'
    * - Mixed     : '192.168.1.100, my.smoothie.board'
    * - Array     : ['192.168.1.100-120', 'my.smoothie.board']
    * ```
    *
    * @method sh.scanner.scan
    * @param  {String|Array}           input               Ip's scan pattern.
    * @param  {Object}                 settings            Scan settings.
    * @param  {Integer}                settings.timeout    Scan timeout for each ip.
    * @param  {sh.scanner.onstart}     settings.onstart    ...
    * @param  {sh.scanner.onboard}     settings.onboard    ...
    * @param  {sh.scanner.onprogress}  settings.onprogress ...
    * @param  {sh.scanner.onabort}     settings.onabort    ...
    * @param  {sh.scanner.onresume}    settings.onresume   ...
    * @param  {sh.scanner.onstop}      settings.onstop     ...
    * @param  {sh.scanner.onend}       settings.onend      ...
    * @return {sh.scanner}             this                Chainable
    */
    sh.scanner.scan = function(input, settings) {
        if (this.scanning) {
            throw new Error('Already in scan mode.');
        }

        // default settings
        settings = settings || {};

        // default timeout
        var timeout = settings.timeout || null;

        // set input and timeout
        input   && this.setInput(input);
        timeout && this.setTimeout(timeout);

        // reset scann properties
        this.scanning = true;
        this.aborted  = false;
        this.total    = this.queue.length;
        this.scanned  = 0;
        this.found    = 0;
        this.boards   = {};

        // set user callbacks
        for (var callback in settings) {
            if (callback.indexOf('on') === 0 && this[callback]) {
                this[callback] = settings[callback];
            }
        }

        // call onstart callback
        this.onstart(this.queue);

        // process queue
        this.processQueue();

        // return self
        return this;
    };

    /**
    * Stop current scan.
    * @method sh.scanner.stop
    * @param  {Boolean}  [silent]  If true the [onstop] callback was not trigered {@default false}.
    * @return {Boolean}  status    Return [true] if stopped, [false] if already stopped.
    */
    sh.scanner.stop = function(silent) {
        if (this.scanning || this.aborted) {
            !silent && this.onstop(this);
            this.scanning = false;
            this.aborted  = false;
            return true;
        }
        return false;
    };

    /**
    * Abort current scan.
    * @method sh.scanner.abort
    * @return {Boolean}  status  Return [true] if aborted, [false] if already aborted.
    */
    sh.scanner.abort = function() {
        if (this.stop(true)) {
            this.aborted = true;
            this.onabort(this);
            return true;
        }
        return false;
    };

    /**
    * Resume aborted scan.
    * @method sh.scanner.resume
    * @param  {Integer}  [timeout]  Optionally resume with a new timeout.
    * @return {Boolean}  status     Return [true] if resumed, [false] if not resumable.
    */
    sh.scanner.resume = function(timeout) {
        if (this.aborted) {
            timeout && this.setTimeout(timeout);
            this.aborted  = false;
            this.scanning = true;
            this.onresume(this);
            this.processQueue();
            return true;
        }
        return false;
    };

    // -------------------------------------------------------------------------

    /**
    * Command module.
    * @namespace
    * @see http://smoothieware.org/console-commands
    */
    sh.command = {};

    /**
    * List the files in the folder passed as a parameter.
    * @method sh.command.ls
    * @param  {String}    ip               Board ip.
    * @param  {String}    path             Path to list, can be absolute or relative.
    * @param  {Object}    settings         See "{@link sh.network.command}.settings".
    * @param  {Callback}  settings.filter  Function to filter the files list.
    * @return {XMLHttpRequest}
    */
    sh.command.ls = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'ls -s ' + path;

        // hack to by sure to get the right file size when filename contains spaces
        command += '\nok\nls ' + path;

        // default filename filter callback
        settings.filter = settings.filter  || null;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // error
            if (raw.indexOf('Could not open directory') === 0) {
                return raw;
            }

            // split the two ls response
            var results = raw.split('\nok\n');
            var sizes   = results[0].split('\n');
            var names   = results[1].split('\n');

            var i, il, name, type, size, files = [];

            for (i = 0, il = sizes.length; i < il; i++) {
                name = names[i].trim();
                type = names[i] === sizes[i] ? 'folder' : 'file';
                size = sizes[i];
                size = parseFloat(size.replace(name, '').trim());

                files.push({ path: path, name: name, type: type, size: size });
            }

            // filter files
            if (settings.filter) {
                files = files.filter(settings.filter);
            }

            // return files
            return files;
        };

        // send the command
        return sh.network.command(ip, command, settings);
    };

    /**
    * Change the current folder to the folder passed as a parameter.
    * @method sh.command.cd
    * @param  {String}  ip        Board ip.
    * @param  {String}  path      Path to folder, can be absolute or relative.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.cd = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'cd ' + path;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // error
            var message = raw.trim();

            if (message.length) {
                return message;
            }

            return { message: message };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Shows the current folder.
    * @method sh.command.pwd
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.pwd = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'pwd';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { directory: raw.trim() };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get the content of the file given as a parameter.
    * @method sh.command.cat
    * @param  {String}   ip              Board ip.
    * @param  {String}   path            Path to file, can be absolute or relative.
    * @param  {Object}   settings        See "{@link sh.network.command}.settings".
    * @param  {Integer}  settings.limit  Limit the returned number of lines.
    * @return {XMLHttpRequest}
    */
    sh.command.cat = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        // set limit if requested
        var limit = settings.limit ? (' ' + settings.limit) : '';

        // set the command
        var command = 'cat ' + path + limit;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // error
            if (raw.indexOf('File not found') === 0) {
                return raw;
            }

            return raw.split('\n');
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Remove a file.
    * @method sh.command.rm
    * @param  {String}  ip        Board ip.
    * @param  {String}  path      Path to file to remove.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.rm = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'rm ' + path;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // error
            if (raw.indexOf('Could not delete') === 0) {
                return raw;
            }

            return { message: 'removed' };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Move a file.
    * @method sh.command.mv
    * @param  {String}  ip        Board ip.
    * @param  {String}  path      Path to file source.
    * @param  {String}  newpath   Path to file destination.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.mv = function(ip, path, newpath, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'mv ' + path + ' ' + newpath;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // error
            if (raw.indexOf('Could not rename') === 0) {
                return raw;
            }

            return { message: raw.trim() };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Alias of {@link sh.network.upload}.
    * Upload a file on the sd card.
    * @method sh.command.upload
    * @param  {String}       ip        Board ip.
    * @param  {Object|File}  file      {File} object or an {Object} with "name" and "data" properties set.
    * @param  {Object}       settings  See "{@link sh.network.request}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.upload = function(ip, file, settings) {
        return sh.network.upload(ip, file, settings);
    };

    /**
    * Reset the system.
    * @method sh.command.reset
    * @param  {String}   ip                        Board ip.
    * @param  {Object}   settings                  See "{@link sh.network.command}.settings".
    * @param  {Integer}  settings.resetDelay       Delay before the smoothie reset (@default: 5000).
    * @param  {Object}   settings.waitUntilOnline  See "{@link sh.network.waitUntilOnline}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.reset = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'reset';

        // delay before the smoothie reset (default: 5 seconds)
        // https://github.com/Smoothieware/Smoothieware/blob/100e5055156f7fbe9f7b57fccdc4bfd0784bc728/src/modules/utils/simpleshell/SimpleShell.cpp#L620
        settings.resetDelay = settings.resetDelay || 5000;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            if (settings.waitUntilOnline) {
                setTimeout(function() {
                    sh.network.waitUntilOnline(ip, settings.waitUntilOnline);
                }, settings.resetDelay + 1000);
            }

            return { message: raw.trim() };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };
    /**
    * Get the input value checksum.
    * @method sh.command.checksum
    * @param  {String}  ip        Board ip.
    * @param  {String}  input     Input value to get checksum.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.checksum = function(ip, input, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'config-load checksum ' + input;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            var checksum = raw.split('=').pop().trim();

            return { checksum: checksum };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get a list of commands.
    * @method sh.command.help
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.help = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'help';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // split response text on new lines
            var lines = raw.trim().split('\n');

            // remove mst line ('Commands:')
            lines.shift();

            // return commands list
            return lines;
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get the board/firmware version.
    * @method sh.command.version
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.version = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'version';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            // version pattern
            // expected : Build version: edge-94de12c, Build date: Oct 28 2014 13:24:47, MCU: LPC1769, System Clock: 120MHz
            var pattern = /Build version: (.*), Build date: (.*), MCU: (.*), System Clock: (.*)/;

            // test the pattern
            var matches = raw.match(pattern);

            if (matches) {
                // split branch-hash on dash
                var branch = matches[1].split('-');

                // response object
                return {
                    branch: branch[0],
                    hash  : branch[1],
                    date  : matches[2],
                    mcu   : matches[3],
                    clock : matches[4]
                };
            }

            // not found
            return 'No version found';
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get information about RAM usage.
    * @method sh.command.mem
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.mem = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set verbosity
        var verbose = settings.verbose ? ' -v' : '';

        // set the command
        var command = 'mem' + verbose;

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get [temp|pos|wcs|state|status|fk|ik].
    * @method sh.command.get
    * @param  {String} ip        Board ip.
    * @param  {String} what      Possible value [temp|pos|wcs|state|status|fk|ik].
    * @param  {Mixed}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.get = function(ip, what, settings) {
        return sh.network.command(ip, 'get ' + what, settings || {});
    };

    /**
    * Get current temperature.
    * @method sh.command.tempGet
    * @param  {String}  ip               Board ip.
    * @param  {Object}  settings         See "{@link sh.network.command}.settings".
    * @param  {Mixed}   settings.device  Possible values: [all, bed, hotend] {@default all}.
    * @return {XMLHttpRequest}
    */
    sh.command.tempGet = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set default device
        var device = settings.device || 'all';
        device = device === 'all' ? '' : ' ' + device;

        // set the command
        var what = 'temp' + device;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('no heaters found') === 0) {
                return raw;
            }
            else if (raw.indexOf('is not a known temperature device') !== -1) {
                return raw;
            }

            // split response on new lines
            var lines = raw.split('\n');

            var i, il, line, temp, temps = [];

            for (i = 0, il = lines.length; i < il; i++) {
                line = lines[i].split(' ');

                // %s (%d) temp: %f/%f @%d
                // designator, id, current_temperature, target_temperature, pwm
                if (device === '') {
                    temp = line[3].split('/');
                    temps.push({
                        type      : line[0] === 'B' ? 'bed' : 'hotend',
                        designator: line[0],
                        id        : line[1].substr(1, line[1].length-2),
                        current   : parseFloat(temp[0] === 'inf' ? Infinity : temp[0]),
                        target    : parseFloat(temp[1]),
                        pwm       : parseFloat(line[4].substr(1))
                    });
                }
                // %s temp: %f/%f @%d
                // designator, id, current_temperature, target_temperature, pwm
                else {
                    temp  = line[2].split('/');
                    temps = {
                        type   : line[0],
                        current: parseFloat(temp[0] === 'inf' ? Infinity : temp[0]),
                        target : parseFloat(temp[1]),
                        pwm    : parseFloat(line[3].substr(1))
                    };
                }
            }

            return temps;
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Set temperature.
    * @method sh.command.tempSet
    * @param  {String}  ip        Board ip.
    * @param  {String}  device    Device [bed|hotend].
    * @param  {Integer} temp      Target tempertaure.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.tempSet = function(ip, device, temp, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'set_temp ' + device + ' ' + temp;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('is not a known temperature device') !== -1) {
                return raw;
            }

            // return message
            return { message: raw };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Set/Get temperature.
    * @method sh.command.temp
    * @param  {String}  ip        Board ip.
    * @param  {String}  [device]  Device [bed|hotend].
    * @param  {Integer} [temp]    Target tempertaure.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.temp = function(ip, device, temp, settings) {
        var args   = Array.prototype.slice.call(arguments);
        var method = args.length > 2 ? 'tempSet' : 'tempGet';
        return sh.command[method].apply(this, args);
    };

    /**
    * Do forward or inverse kinematics on the given cartesian position,
    * optionally moves the actuators and finaly display the coordinates.
    * @method sh.command.kinematics
    * @param  {String}   ip                Board ip.
    * @param  {Object}   settings          See "{@link sh.network.command}.settings".
    * @param  {Boolean}  settings.move     Move to the calculated or given XYZ coords {@default false}.
    * @param  {Boolean}  settings.inverse  Do inverse kinematics {@default false}.
    * @return {XMLHttpRequest}
    */
    sh.command.kinematics = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // inverse or forward
        var type = settings.inverse ? 'ik' : 'fk';

        // move to the calculated or given XYZ coords ?
        var move = settings.move ? ' -m' : '';

        // positions
        var position = settings.position || 0;

        // set coords
        var x, y, z;

        if (typeof position !== 'object') {
            x = y = z = parseFloat(position);
        }
        else {
            x = position.x || 0;
            y = position.y || x;
            z = position.z || y;
        }

        // set the command
        var what = type + move + ' ' + x + ',' + y + ',' + z;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('error:') === 0) {
                return raw.substr(6);
            }

            if (type === 'ik') {
                var pattern = /(.*)= A (.*), B (.*), C (.*)/;
            }
            else {
                var pattern = /(.*)= X (.*), Y (.*), Z (.*), Steps= A (.*), B (.*), C (.*)/;
            }

            var matches = raw.match(pattern);

            if (matches) {
                if (type == 'ik') {
                    return {
                        type: matches[1],
                        coords: {
                            a: parseFloat(matches[2]),
                            b: parseFloat(matches[3]),
                            c: parseFloat(matches[4]),
                        }
                    }
                }

                return {
                    type: matches[1],
                    coords: {
                        x: parseFloat(matches[2]),
                        y: parseFloat(matches[3]),
                        z: parseFloat(matches[4]),
                    },
                    steps: {
                        a: parseFloat(matches[5]),
                        b: parseFloat(matches[6]),
                        c: parseFloat(matches[7]),
                    }
                }
            }

            return 'unknown error';
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Get current position.
    * @method sh.command.position
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.position = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var what = 'pos';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            // split on new lines
            var lines = raw.split('\n');

            var i, il, line, key, positions = {};

            for (i = 0, il = lines.length; i < il; i++) {
                line = lines[i].split(':');
                key  = line.shift().replace(' ', '_').toLowerCase();
                line = line.join(':').trim().split(' ');

                positions[key] = {
                    x: parseFloat(line[0].substr(2)),
                    y: parseFloat(line[1].substr(2)),
                    z: parseFloat(line[2].substr(2))
                };
            }

            // split response text on new lines
            return positions;
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Get work coordinate system.
    * @method sh.command.wcs
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.wcs = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var what = 'wcs';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            // split on new lines
            var lines = raw.split('\n');

            var i, il, line, key, wcs = {};

            // extract the first line as current wcs
            wcs.current = lines.shift().split(':').pop().replace(']', '').trim();

            for (i = 0, il = lines.length; i < il; i++) {
                line = lines[i].substr(1, lines[i].length - 2).split(/[:,]/);
                key  = line.shift();

                if (key === 'PRB') {
                    key = 'prob';
                }
                else if (key[0] !== 'G') {
                    key = key.replace(' ', '_').toLowerCase();
                }

                wcs[key] = {
                    x: parseFloat(line[0]),
                    y: parseFloat(line[1]),
                    z: parseFloat(line[2])
                };

                if (key === 'prob') {
                    wcs[key].ok = !!parseInt(line[3]);
                }
            }

            return wcs;
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Get system state.
    * @method sh.command.state
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.state = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var what = 'state';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            // remove brackets and split on spaces
            var parts = raw.substr(1, raw.length - 2).split(' ');
            var state = {};

            // [G0 G54 G17 G21 G90 G94 M0 M5 M9 T0 F0.]
            state.move      = parts[0];
            state.rapid     = state.move === 'G0';
            state.arc_cw    = state.move === 'G2';
            state.arc_ccw   = state.move === 'G3';
            state.wcs       = parts[1];
            state.plane     = parts[2] === 'G17' ? 'XY' : (parts[2] === 'G18' ? 'ZX' : (parts[2] === 'G19' ? 'YZ' : '--'));
            state.units     = parts[3] === 'G20' ? 'in' : 'mm';
            state.mode      = parts[4] === 'G90' ? 'absolute' : 'relative';
            state.absolute  = state.mode === 'absolute';
            state.relative  = state.mode === 'relative';
            state.tool      = parseInt(parts[9].substr(1));
            state.feed_rate = parseFloat(parts[10].substr(1));

            return state;
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Get system status.
    * @method sh.command.status
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.status = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var what = 'status';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();
            raw = raw.substr(1, raw.length - 2);
            raw = raw.replace('MPos:', '').replace('WPos:', '');

            var parts  = raw.split(',');
            var status = {
                state: parts[0],
                machine: {
                    x: parseFloat(parts[1]),
                    y: parseFloat(parts[2]),
                    z: parseFloat(parts[3]),
                },
                world: {
                    x: parseFloat(parts[4]),
                    y: parseFloat(parts[5]),
                    z: parseFloat(parts[6]),
                }
            };

            return status;
        };

        // send the comand
        return sh.command.get(ip, what, settings);
    };

    /**
    * Switch.
    * @method sh.command.switch
    * @param  {String}  ip        Board ip.
    * @param  {String}  device    Device ex.: 'fan' or 'misc'.
    * @param  {String}  value     State [on|off] or value.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.switch = function(ip, device, value, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'switch ' + device + ' ' + value;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('is not a known switch device') !== -1) {
                return raw;
            }

            // return message
            return { message: raw };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get network config.
    * @method sh.command.net
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.net = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'net';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            var matches = raw.match(/IP Addr:([^\n]+)\nIP GW:([^\n]+)\nIP mask:([^\n]+)\nMAC Address:([^\n]+)/);

            if (matches) {
                return {
                    ip     : matches[1].trim(),
                    gateway: matches[2].trim(),
                    mask   : matches[3].trim(),
                    mac    : matches[4].trim()
                }
            }

            // return message
            return { message: raw };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Remount...
    * @method sh.command.remount
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.remount = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'remount';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { message: raw.trim() };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Calculate the Steinhart Hart coefficients for a thermistor.
    * @method sh.command.thermistorCalc
    * @param  {String}                             ip                Board ip.
    * @param  {String}                             values            Thermistor values separated by commas 'T1,R1,T2,R2,T3,R3'.
    * @param  {Object}                             settings          See "{@link sh.network.command}.settings".
    * @param  {Integer}                            settings.storeto  Store the results to thermistor n.
    * @param  {Boolean}                            settings.save     Save the stored results to override-config (storeto must be set).
    * @param  {sh.command.thermistorSaveCallback}  settings.onsave   Called when the values was saved.
    * @return {XMLHttpRequest}
    */
    sh.command.thermistorCalc = function(ip, values, settings) {
        // defaults settings
        settings = settings || {};

        // store to thermistor n
        var storeto = '';

        if (settings.storeto || settings.storeto === 0) {
            storeto = '-s' + settings.storeto + ' ';
        }

        // set the command
        var command = 'calc_thermistor ' + storeto + values;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('Usage: calc_thermistor') === 0) {
                return raw;
            }

            var lines   = raw.split('\n');
            var result  = lines.shift().trim();
            var message = lines.shift().trim();
            var matches = result.match(/Steinhart Hart coefficients: *I(.*)J(.*)K(.*)/);

            if (matches) {
                var I = matches[1].trim();
                var J = matches[2].trim();
                var K = matches[3].trim();

                if (I === 'nan' || J === 'nan' || K === 'nan') {
                    return 'invalid input values';
                }

                result = { I: parseFloat(I), J: parseFloat(J), K: parseFloat(K) };
            }

            if (settings.save && storeto !== '') {
                sh.network.command(ip, 'M500', {
                    onresponse: function(response) {
                        if (settings.onsave) {
                            settings.onsave.call(this, response);
                        }
                    }
                });
            }

            return { message: message, result: result };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Callback called by {@link sh.command.thermistorCalc} when the values was saved.
    * @callback sh.command.thermistorSaveCallback
    * @param    {Object} response The response object provided by the {@link sh.network.responseCallback}.
    */

    /**
    * Get the predefined thermistors.
    * @method sh.command.thermistors
    * @param  {String}  ip        Board ip.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.thermistors = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'thermistors';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            var lines   = raw.split('\n');
            var result  = { table: {}, beta: {} };
            var pointer = result.table;

            var i, il, line, matches, name, value;

            for (i = 0, il = lines.length; i < il; i++) {
                line    = lines[i].trim();
                matches = line.match(/^([0-9]+) - (.*)/);

                if (line.indexOf('Beta table') !== -1) {
                    pointer = result.beta;
                    continue;
                }

                if (matches) {
                    name  = matches[2].trim();
                    value = parseFloat(matches[1].trim());

                    pointer[name] = value;
                }
            }

            return result;
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get md5 sum of the given file.
    * @method sh.command.md5sum
    * @param  {String}  ip        Board ip.
    * @param  {String}  path      Relative or absolute path to file.
    * @param  {Object}  settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.md5sum = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'md5sum ' + path;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (raw.indexOf('File not found') !== -1) {
                return raw;
            }

            var parts = raw.split(' ');

            return {
                md5 : parts.shift().trim(),
                file: parts.shift().trim()
            };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Play a gcode file.
    * @method sh.command.play
    * @param  {String}   ip                Board ip.
    * @param  {String}   path              Relative or absolute path to file.
    * @param  {Object}   settings          See "{@link sh.network.command}.settings".
    * @param  {Boolean}  settings.verbose  Verbose output {@default false}.
    * @return {XMLHttpRequest}
    */
    sh.command.play = function(ip, path, settings) {
        // defaults settings
        settings = settings || {};

        var verbose = settings.verbose ? ' -v' : '';

        // set the command
        var command = 'play ' + path + verbose;

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (! raw.length) {
                return 'Alarm';
            }

            if (raw.indexOf('File not found') !== -1) {
                return raw;
            }

            if (raw.indexOf('Currently printing') !== -1) {
                return raw;
            }

            var lines = raw.split('\n');
            var file  = lines.shift().split(' ').pop().trim();
            var size  = -1;

            if (raw.indexOf('WARNING') === -1) {
                size = parseFloat(lines.shift().split(' ').pop().trim());
            }

            return { file: file, size: size };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Get progress of current play.
    * @method sh.command.progress
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.progress = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'progress';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (! raw.length) {
                return 'Alarm';
            }

            if (raw.indexOf('Not currently playing') !== -1) {
                return raw;
            }

            if (raw.indexOf('File size is unknown') !== -1) {
                return raw;
            }

            if (raw.indexOf('SD print is paused at') !== -1) {
                var parts = raw.split(' ');

                return {
                    paused: true,
                    total : parseFloat(parts.pop().trim()),
                    played: parseFloat(parts.pop().trim())
                };
            }

            // file: %s, %u %% complete, elapsed time: %lu s, est time: %lu s
            if (raw.indexOf('file:') === 0) {
                var parts = raw.split(' ');

                return {
                    paused  : false,
                    file    : parts[2].substr(0, parts[2].length - 2),
                    complete: parseFloat(parts[3]),
                    elapsed : parseFloat(parts[8]),
                    esteemed: parts[12] ? parseFloat(parts[12]) : Infinity,
                };
            }
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Abort currently playing file.
    * @method sh.command.abort
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.abort = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'abort';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (! raw.length) {
                return 'Alarm';
            }

            if (raw.indexOf('Not currently playing') !== -1) {
                return raw;
            }

            return { message: raw };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Suspend a print in progress.
    * @method sh.command.suspend
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.suspend = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'suspend';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (! raw.length) {
                return 'Alarm';
            }

            if (raw.indexOf('Already suspended') !== -1) {
                return raw;
            }

            return { message: raw };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Resume the suspended print.
    * @method sh.command.resume
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.resume = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'resume';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            raw = raw.trim();

            if (! raw.length) {
                return 'Alarm';
            }

            if (raw.indexOf('Not suspended') !== -1) {
                return raw;
            }

            if (raw.indexOf('Resume aborted by kill') !== -1) {
                return 'Resume aborted by kill';
            }

            var lines = raw.split('\n');

            // TODO: parse response
            // REF: https://github.com/Smoothieware/Smoothieware/blob/8cbd981e85c918e059a6e68d70fbf3cdad0f8ca5/src/modules/utils/player/Player.cpp#L614

            return { lines: lines };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Reset alarm.
    * @method sh.command.resetAlarm
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.resetAlarm = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = '$X';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { message: 'unlocked' };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Send ok (ping).
    * @method sh.command.ok
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.ok = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // set the command
        var command = 'ok';

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { message: raw.trim() };
        };

        // send the comand
        return sh.network.command(ip, command, settings);
    };

    /**
    * Ping.
    * @method sh.command.ping
    * @param  {String}   ip        Board ip.
    * @param  {Object}   settings  See "{@link sh.network.command}.settings".
    * @return {XMLHttpRequest}
    */
    sh.command.ping = function(ip, settings) {
        // defaults settings
        settings = settings || {};

        // default response parser callback
        settings.parser = settings.parser || function(raw) {
            return { message: 'pong' };
        };

        // send the comand
        return sh.command.ok(ip, settings);
    };

})();
