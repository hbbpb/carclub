/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'hbb-weixin-api',
    './message'
], function (weixin, message) {
    'use strict';

    var wxRouters = function (app) {
        //接入验证
        app.get('/<***>', function (req, res) {
            // 签名成功
            if (weixin.checkSignature(req)) {
                res.send(200, req.query.echostr);
            } else {
                res.send(200, 'fail');
            }
        });

        //config
        weixin.token = '<***>';

        message.bind();

        //Start
        app.post('/<***>', function (req, res) {
            //loop
            weixin.loop(req, res);
        });
    };

    return wxRouters;
});