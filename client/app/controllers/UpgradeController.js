/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */

define(function () {
    'use strict';

    return ['$scope', '$window', '$routeParams', '$log', '$location', 'User', function ($scope, $window, $routeParams, $log, $location, User) {

        var openID = $routeParams.openID;

        $scope.getUser = function (userID) {
            User.get({id: userID}, function (doc) {
                if (doc && doc.model) {
                    $scope.userName = doc.model.User.name;
                    User.update({id: userID}, function () {
                        $log.debug($scope.userName + '申请升级成功！');
                    });
                } else {
                    $location.path('/error');
                }
            });
        };

        $scope.back = function () {
            $window.history.back();
        };

        if (openID) {
            $scope.userName = '用户';
            $scope.getUser(openID);
        } else {
            $location.path('/error');
        }

        $scope.$apply();
    }];
});