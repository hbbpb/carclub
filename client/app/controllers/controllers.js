/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define(['angular', 'config'], function (angular, config) {
    'use strict';

    //noinspection JSValidateTypes
    var controllers = angular.module(config.APP_NAME + '.controllers', [])
        .controller('HomeController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/HomeController'], function (HomeController) {
                $injector.invoke(HomeController, this, {'$scope': $scope});
            });
        }])
        .controller('AddCarController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/AddCarController'], function (AddCarController) {
                $injector.invoke(AddCarController, this, {'$scope': $scope});
            });
        }])
        .controller('UpgradeController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/UpgradeController'], function (UpgradeController) {
                $injector.invoke(UpgradeController, this, {'$scope': $scope});
            });
        }])
        .controller('SucceedController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/SucceedController'], function (SucceedController) {
                $injector.invoke(SucceedController, this, {'$scope': $scope});
            });
        }])
        .controller('ErrorController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/ErrorController'], function (ErrorController) {
                $injector.invoke(ErrorController, this, {'$scope': $scope});
            });
        }])
        .controller('QRCodeController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/QRCodeController'], function (QRCodeController) {
                $injector.invoke(QRCodeController, this, {'$scope': $scope});
            });
        }])
        .controller('RankController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/RankController'], function (RankController) {
                $injector.invoke(RankController, this, {'$scope': $scope});
            });
        }])
        .controller('AppointmentController', ['$scope', '$injector', function ($scope, $injector) {
            require(['controllers/AppointmentController'], function (AppointmentController) {
                $injector.invoke(AppointmentController, this, {'$scope': $scope});
            });
        }]);
    return controllers;
});