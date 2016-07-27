/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */

define(function () {
    'use strict';

    return ['$scope', '$window', function ($scope, $window) {

        $scope.back = function () {
            $window.history.back();
        };
        $scope.$apply();
    }];
});