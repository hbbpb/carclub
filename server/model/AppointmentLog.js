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

    var AppointmentLog = new Schema({
        userID: String,
        moveCarNumber: String,
        moveTime: { type: Date, default: Date.now },
        createTime: { type: Date, default: Date.now }
    });

    AppointmentLog.index({userID: 1});

    return mongoose.model(db.AppointmentLog, AppointmentLog);
});