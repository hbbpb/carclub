/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define(['config', 'app'], function (config, app) {
    'use strict';

    var routes = app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'HomeController'
        })
            .when('/addcar/:type/:openID', {
                templateUrl: 'app/templates/addCarView.html',
                controller: 'AddCarController'
            })
            .when('/upgrade/:openID', {
                templateUrl: 'app/templates/upgradeView.html',
                controller: 'UpgradeController'
            })
            .when('/succeed/:type', {
                templateUrl: 'app/templates/succeedView.html',
                controller: 'SucceedController'
            })
            .when('/error', {
                templateUrl: 'app/templates/errorView.html',
                controller: 'ErrorController'
            })
            .when('/qrcode/:openID', {
                templateUrl: 'app/templates/qrcodeView.html',
                controller: 'QRCodeController'
            })
            .when('/rank', {
                templateUrl: 'app/templates/rankView.html',
                controller: 'RankController'
            })
            .when('/appointment/:carNumber/:openID', {
                templateUrl: 'app/templates/appointmentView.html',
                controller: 'AppointmentController'
            })
            .otherwise({redirectTo: '/'});
    }]);

    //全局常量
    app.constant('app', {});

    //全局设置
//    app.run(['$cacheFactory', '$http', function ($cacheFactory, $http) {
    //http cache
    //$http.defaults.cache = global.httpCache = $cacheFactory('gvHttpCache', {capacity: 200});
//    }]);

    return routes;
});