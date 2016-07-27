/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'node-uuid',
    './../common',
    '../../model/Car'
], function (uuid, common, Car) {
    'use strict';

    var controller = {
        getCar: function (req, res) {
            var id = req.params.id;
            var reg = new RegExp('^' + common.getSafeText(id) + '$', 'i');
            Car.findOne({_id: reg}, function (err, doc) {
                if (err) {
                    res.json(500, {error: err});
                    return;
                }
                res.json(200, {model: doc});
            });
        },
        addCar: function (req, res) {
            var model = req.body;
            model.User.grade = 1;
            model.Car.number = model.Car.number.toUpperCase();
            if (model.WX.uuid == null) {
                model.WX.uuid = uuid.v4().replace(/-/g, '');
            }
            Car.update({_id: model.Car.number}, {$set: model}, {upsert: true}, function (err, numberAffected) {
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
        app.get('/api/v1/cars/:id', controller.getCar);
        app.post('/api/v1/cars', controller.addCar);
    };

    return router;
});