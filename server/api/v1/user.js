/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    './../common',
    '../../model/Car'
], function (common, Car) {
    'use strict';

    var controller = {
        getUser: function (req, res) {
            var id = req.params.id;
            Car.findOne({'WX.openID': id}, function (err, doc) {
                if (err) {
                    res.json(500, {error: err});
                    return;
                }
                res.json(200, {model: doc});
            });
        },
        upgrade: function (req, res) {
            var id = req.params.id;
            Car.update({'WX.openID': id}, {$set: {'User.grade': 2}}, function (err, numberAffected) {
                if (err) {
                    res.json(500, {error: err});
                    return;
                }
                if (numberAffected > 0) {
                    res.json(200);
                } else {
                    res.json(300);
                }
            });
        }
    };

    var router = function (app) {
        app.get('/api/v1/users/:id', controller.getUser);
        app.put('/api/v1/users/:id', controller.upgrade);
    };

    return router;
});