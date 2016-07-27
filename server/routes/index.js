/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    './home'
], function (home) {
    'use strict';

    var viewRouters = function (app) {
        home(app);
    };

    return viewRouters;
});