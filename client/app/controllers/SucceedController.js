/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */

define(function () {
    'use strict';

    return ['$scope', '$window', '$routeParams', '$location', function ($scope, $window, $routeParams, $location) {

        var type = $routeParams.type;
        if (type === 'bind') {
            $scope.message = '绑定成功，您现在可以使用高级功能。';
        } else if (type === 'edit') {
            $scope.message = '车辆信息更新成功。';
        } else if (type === 'add') {
            $scope.message = '车辆信息登记成功。';
        } else if (type === 'appointment') {
            $scope.message = '预约挪车成功，车主将收到邮件通知。';
        } else {
            $location.path('/error');
        }

        $scope.back = function () {
            $window.history.back();
        };
        $scope.$apply();
    }];
});