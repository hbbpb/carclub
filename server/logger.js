/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'log4js',
    'config'
], function (log4js, config) {
    'use strict';

    var logger;
    log4js.configure({
        appenders: [
            { type: 'console' }
//            { type: 'file', filename: config.LogFileName, category: 'server'}
        ]
    });

    logger = log4js.getLogger('server');
    logger.setLevel(config.LogLevel);
    return logger;
});