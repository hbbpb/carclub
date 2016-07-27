/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define(function () {
    'use strict';

    var homeController = {
        index: function (req, res) {
            res.render('index', { title: 'Car Club' });
        }
    };

    var homeRoute = function (app) {
        app.get('/', homeController.index);
        app.get('/index', homeController.index);
    };

    return homeRoute;
})
;
