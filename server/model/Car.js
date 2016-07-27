/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'mongoose',
    './defines/DBConfig'
], function (mongoose, db) {
    'use strict';

    var Schema = mongoose.Schema;

    var Car = new Schema({
        _id: String,
        Car: {
            number: String,
            markNumber: String,
            brand: String
        },
        User: {
            name: String,
            markName: String,
            grade: Number,
            email: String,
            mood: String

        },
        Phone: {
            mobile: String,
            gcPhone: String
        },
        WX: {
            name: String,
            openID: String,
            uuid: String
        }
    });

    Car.index({'WX.openID': 1});
    Car.index({'WX.uuid': 1});

    return mongoose.model(db.Car, Car);
});