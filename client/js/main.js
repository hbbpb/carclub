/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
require(['config'], function (config) {
    'use strict';

    requirejs.config(config);
    require([
        'angular',
        'app',
        'routes/routes'
    ], function (angular) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [config.APP_NAME]);
            if (config.Debug) {
                console.log('Car club application started.');
            } else {
                //google analytics
//                window._gaq = window._gaq || [];
//                window._gaq.push(['_setAccount', '<***>']);
//                window._gaq.push(['_trackPageview']);
//                require(['ga']);
            }
        });
    });
});


