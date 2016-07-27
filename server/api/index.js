/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    './v1/car',
    './v1/user',
    './v1/appointment'
], function (car, user, appointment) {
    'use strict';

    var apiRouters = function (app) {
        car(app);
        user(app);
        appointment(app);
    };

    return apiRouters;
});