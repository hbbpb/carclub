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

    var MoveLog = new Schema({
        userID: String,
        moveCarNumber: String,
        moveTime: { type: Date, default: Date.now },
        createTime: Number
    });

    MoveLog.index({moveCarNumber: 1, userID: 1, createTime: 1});

    return mongoose.model(db.MoveLog, MoveLog);
});