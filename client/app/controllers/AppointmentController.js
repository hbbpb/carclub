/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */

define(function () {
    'use strict';

    return ['$scope', '$log', '$location', '$routeParams', 'Appointment', function ($scope, $log, $location, $routeParams, Appointment) {

        var carNumber = $routeParams.carNumber || '陕A12T45';
        var openID = $routeParams.openID || '123';
        if (carNumber == null || openID == null) {
            $location.path('/error');
        }

        $scope.buttonDisable = true;
        $scope.carNumber = carNumber;
        $scope.saveing = false;

        $scope.$watch('time', function (newValue) {
            if (newValue == null || newValue === '') {
                $scope.buttonDisable = true;
            } else {
                $scope.buttonDisable = false;
            }
        });

        $scope.save = function () {
            $log.debug($scope.carNumber);
            $log.debug($scope.time);

            var model = new Appointment();
            model.userID = openID;
            model.moveCarNumber = carNumber;
            model.moveTime = $scope.time;
            $scope.saveing = true;
            $scope.buttonDisable = true;
            model.$save(function () {
                $log.debug('预约成功！');
                $location.path('/succeed/appointment');
            });
        };

        $scope.$apply();
    }];
});