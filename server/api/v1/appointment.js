/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'q',
    'nodemailer',
    './../common',
    '../../model/Car',
    '../../model/AppointmentLog'
], function (Q, nodemailer, common, Car, AppointmentLog) {
    'use strict';

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '<***>',
            pass: '<***>'
        }
    });

    function getCarByNumber(carNumber) {
        var deferred = Q.defer();
        Car.findOne({_id: carNumber}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function getCarByOpenID(openID) {
        var deferred = Q.defer();
        Car.findOne({'WX.openID': openID}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    var controller = {
        sendMail: function (req, res) {
            var carNumber = req.body.moveCarNumber;
            var openID = req.body.userID;
            var moveTime = req.body.moveTime;
            var localMoveTime = new Date(moveTime);

            Q.all([
                getCarByNumber(carNumber),
                getCarByOpenID(openID)
            ])
                .then(function (values) {
                    var to = values[0];
                    var from = values[1];
                    var model = new AppointmentLog();
                    model.userID = from.WX.openID;
                    model.moveCarNumber = to.Car.number;
                    model.moveTime = localMoveTime;
                    model.createTime = Date.now();
                    model.save(function (err) {
                        if (err) {
                            res.json(500, {error: err});
                            return;
                        }
                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: 'GC车友会<***>', // sender address
                            to: to.User.name + '<' + to.User.email + '>', // list of receivers
                            cc: from.User.name + '<' + from.User.email + '>',
                            subject: '[GC车友会]预约挪车', // Subject line
                            text: '你好，' + to.User.name + '\n\n' +
                                '[GC车友会]金牌用户[' + from.User.name + ']预约你于[' + (new Date(localMoveTime.setHours(localMoveTime.getHours() + 8))).toLocaleTimeString() + ']挪车。'
                        };
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) {
                                res.json(500, {error: err});
                                return;
                            }
                            res.json(200);
                        });
                    });
                })
                .catch(function (err) {
                    res.json(500, {error: err});
                });
        }
    };

    var router = function (app) {
        app.post('/api/v1/appointment', controller.sendMail);
    };

    return router;
});