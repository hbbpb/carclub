/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
//region requirejs
var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});
//endregion

requirejs([
    'http',
    'config',
    './server/logger',
    'express',
    'ejs',
    'compression',
    //'serve-favicon',
    'morgan',
    'serve-static',
    'errorhandler',
    'body-parser',
    'mongoose',
    'server/api/index',
    'server/weixin/index'
], function (http, config, logger, express, ejs, compress, morgan, serveStatic, errorhandler, bodyParser, mongoose, apiRoutes, weixinRoutes) {
    'use strict';

    //region http server
    try {
        //region database
        mongoose.connect(config.db.ConnectString);
        logger.info('DB: connect to ' + config.db.ConnectString);
        //endregion

        //region express
        var app = express();
        var server = http.Server(app);
//        app.use(compress());
        app.use(bodyParser.json());
//        app.use(methodOverride());
        //endregion

        //region development log
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('short'));
        }
        //endregion

        //region routes
        apiRoutes(app);
        weixinRoutes(app);
        //endregion

        //region static and favicon
        if (process.env.NODE_ENV === 'development') {
            app.use(serveStatic(__dirname + '/client'));
        } else {
            app.use(serveStatic(__dirname + '/client-build'));
        }
        //endregion

        //region error handler
        app.use(function (err, req, res, next) {
            if (err) {
                logger.error('app.errorHandler---->' + res.req.method + ' ' + res.req.url);
                logger.error('app.errorHandler---->err:' + JSON.stringify(err));
            }
            next();
        });
        app.use(errorhandler());
        //endregion

        //region port
        var port = process.env.PORT || 3030;      //for heroku
//        var port = 18080;      //for BAE
        server.listen(port, function () {
            logger.info('app---->Http server listening on port ' + port);
        });
        //endregion
    } catch (err) {
        logger.error('app---->err:' + JSON.stringify(err));
    } finally {
    }
    //endregion
});
