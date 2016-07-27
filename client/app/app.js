/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'config',
    'angular',
    'angular-route',
    'angular-messages',
    'mobile-angular-ui',
    'mobile-angular-ui-gestures',
    'services/services',
    'controllers/controllers',
    'qrcode',
    'qrcode-utf8',
    'ng-qrcode',
    'datepicker'
], function (config, angular) {
    'use strict';

    var appName = config.APP_NAME || 'App';
    var app = angular.module(appName, [
        'ngRoute',
        'ngMessages',
        'mobile-angular-ui',
        'mobile-angular-ui.gestures', appName + '.controllers', appName + '.services',
        'monospaced.qrcode',
        'angular-datepicker'
    ]);
    return app;
});