/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define(function () {
    'use strict';

    var debug = false;

    var paths = {
        'config': '/js/config',
        'app': '../app/app',
        'controllers': '../app/controllers',
        'templates': '../app/templates',
        'routes': '../app/routes',
        'services': '../app/services',
        'filters': '../app/filters',
        'directives': '../app/directives',
        'common': '../app/common',
        /*libs*/
        'angular': '/libs/angular/angular.min',
        'angular-resource': '/libs/angular-resource/angular-resource.min',
        'angular-route': '/libs/angular-route/angular-route.min',
        'angular-animate': '/libs/angular-animate/angular-animate.min',
        'angular-messages': '/libs/angular-messages/angular-messages.min',
//        'angular': '//ajax.useso.com/ajax/libs/angularjs/1.3.8/angular.min',
//        'angular-resource': '//ajax.useso.com/ajax/libs/angularjs/1.3.8/angular-resource.min',
//        'angular-route': '//ajax.useso.com/ajax/libs/angularjs/1.3.8/angular-route.min',
//        'angular-animate': '//ajax.useso.com/ajax/libs/angularjs/1.3.8/angular-animate.min',
//        'angular-messages': '//ajax.useso.com/ajax/libs/angularjs/1.3.8/angular-messages.min',
        'mobile-angular-ui': '/libs/mobile-angular-ui/dist/js/mobile-angular-ui.min',
        'mobile-angular-ui-gestures': '/libs/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min',
        'ng-qrcode': '/libs/angular-qrcode-hbb/qrcode',
        'qrcode': '/libs/qrcode-generator/js/qrcode',
        'qrcode-utf8': '/libs/qrcode-generator/js/qrcode_UTF8',
        'datepicker': '/libs/angular-native-picker/build/angular-datepicker',
        'date-picker': '/libs/pickadate/lib/compressed/picker',
        'date-picker-time': '/libs/pickadate/lib/compressed/picker.time',
//        'jquery': '//ajax.useso.com/ajax/libs/jquery/2.0.3/jquery.min',
        'jquery': '/libs/jquery/jquery.min',
        'ga': '//www.google-analytics.com/ga'
    };
    if (debug) {
        for (var key in paths) {
            if (paths.hasOwnProperty(key)) {
                var value = paths[key];
                paths[key] = value.replace('.min', '');
            }
        }
    }

    return  {
        APP_NAME: 'CarClub',
        Debug: debug,
        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            },
            'angular-resource': {
                deps: ['angular']
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-animate': {
                deps: ['angular']
            },
            'mobile-angular-ui': {
                deps: ['angular']
            },
            'mobile-angular-ui-gestures': {
                deps: ['angular']
            },
            'angular-messages': {
                deps: ['angular']
            },
            'ng-qrcode': {
                deps: ['angular']
            },
            'qrcode-utf8': {
                deps: ['qrcode']
            },
            'qrcode': {
                exports: 'qrcode'
            },
            'datepicker': {
                deps: ['angular', 'date-picker-time']
            },
            'date-picker-time': {
                deps: ['date-picker']
            }
        },
        paths: paths,
        waitSeconds: 0
    };
});