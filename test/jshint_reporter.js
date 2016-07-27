/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
var path = require('path');

module.exports = {
    reporter: function (results, data, opts) {
        'use strict';

        var dirname = path.dirname(module.filename);
        var basePath = path.join(dirname, '..');

        var len = results.length;
        var str = '';
        var prevfile;

        opts = opts || {};

        results.forEach(function (result) {
            var file = result.file;
            var error = result.error;

            if (prevfile && prevfile !== file) {
                str += '\n';
            }
            prevfile = file;

            str += path.join(basePath, file) + ':' + error.line + ':' +
                error.character + '\n' + error.reason;

            if (opts.verbose) {
                str += ' (' + error.code + ')';
            }

            str += '\n';
        });

        if (str) {
            process.stdout.write(str + '\n' + len + ' error' + ((len === 1) ? '' : 's') + '\n');
        }
    }
};
