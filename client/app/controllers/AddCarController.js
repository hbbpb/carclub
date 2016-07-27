/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */

define(function () {
    'use strict';

    return ['$scope', '$log', '$location', '$routeParams', 'Car', 'User', function ($scope, $log, $location, $routeParams, Car, User) {

        var type = $routeParams.type;
        var openID = $routeParams.openID;
        if (type == null || openID == null) {
            $location.path('/error');
        }

        $scope.model = new Car();
        $scope.model.WX = {};
        $scope.model.WX.openID = openID;

        $scope.getUser = function (userID) {
            User.get({id: userID}, function (doc) {
                if (doc && doc.model) {
                    $scope.model.Car = doc.model.Car;
                    $scope.model.User = doc.model.User;
                    $scope.model.Phone = doc.model.Phone;
                    $scope.model.WX = doc.model.WX;
                } else {
                    $location.path('/error');
                }
            });
        };

        if (type === 'bind') {
            $scope.buttonText = '绑定';
            $scope.titleText = '车辆绑定';
        } else if (type === 'edit') {
            $scope.buttonText = '更新';
            $scope.titleText = '我的爱车';
            $scope.getUser(openID);
        } else {
            $location.path('/error');
        }

        $scope.getCar = function () {
            var carNumber = null;
            if ($scope.model.Car && $scope.model.Car.number) {
                carNumber = $scope.model.Car.number;
            }
            if (carNumber) {
                Car.get({id: $scope.model.Car.number}, function (doc) {
                    if (doc && doc.model) {
                        if (type === 'bind' && doc.model.WX && doc.model.WX.openID != null) {
                            if (doc.model.WX.openID === openID) {
                                alert('你已经绑定过该车辆，请重新输入。');
                            } else {
                                alert('此车辆已被其他用户绑定，请重新输入。');
                            }
                            $scope.clearCar();
                            $scope.model.Car = null;
                        } else {
                            $scope.model.Car = doc.model.Car;
                            $scope.model.User = doc.model.User;
                            $scope.model.Phone = doc.model.Phone;
                        }
                    } else {
                        $scope.clearCar();
                    }
                });
            } else {
                $scope.clearCar();
            }
        };

        $scope.clearCar = function () {
            $scope.model.Car.brand = null;
            $scope.model.User = null;
            $scope.model.Phone = null;
        };

        $scope.addCar = function () {
            $log.debug($scope.model);
            $scope.model.$save(function () {
                $log.debug($scope.buttonText + '成功！');
                $location.path('/succeed/' + type);
            });
        };

        $scope.$apply();
    }];
});