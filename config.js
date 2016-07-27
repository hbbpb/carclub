/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define(['path', 'module'], function (path, module) {
    'use strict';

    var dirname = path.dirname(module.uri);
    var serverLogFileName = path.join(dirname, 'server', 'log', 'server.log');
    var host = process.argv[2];

    var cacheEnable = true;
    var connectString = 'mongodb://127.0.0.1/carclub';
    var cacheServer = '';
    var cachePort = 6379;
    var cachePass = '<***>';
    var cacheExpire = 60 * 60 * 24; //one day
    if (process.env.NODE_ENV === 'development') {
        //开发环境
        cacheEnable = false;
        cachePort = 6379;
        if (host === 'localhost') {
            cacheServer = '127.0.0.1';
            connectString = 'mongodb://127.0.0.1/carclub';
        } else {
            cacheServer = '<***>';
            connectString = '<***>';
        }
    } else {
        //生产环境
        cacheEnable = true;
        cacheServer = '<***>';
        cachePort = 10941;
        connectString = '<***>';
    }

    return {
        LogFileName: serverLogFileName,
        LogLevel: 'debug',    //trace, debug, info, warn, error, fatal
        WatchStatus: false,
        db: {
            ConnectString: connectString
        },
        cache: {
            enable: cacheEnable,
            server: cacheServer,
            port: cachePort,
            pass: cachePass,
            expire: cacheExpire
        }
    };
});