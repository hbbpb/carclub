/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'config',
    'angular-resource',
    'angular'
], function (config, angularResource, angular) {
    'use strict';

    //noinspection JSValidateTypes
    return angular.module(config.APP_NAME + '.services', ['ngResource'])
        .config(['$logProvider', function ($logProvider) {
            // Disable $log if Debug is false.
            $logProvider.debugEnabled(config.Debug);
            if (!config.Debug) {
                var noop = angular.noop;
                $logProvider.$get = function () {
                    return {
                        debug: noop,
                        error: noop,
                        info: noop,
                        log: noop,
                        warn: noop
                    };
                };
            }
        }])
        .factory('Car', ['$resource',
            function ($resource) {
                return $resource('/api/v1/cars/:id');
            }])
        .factory('User', ['$resource',
            function ($resource) {
                return $resource('/api/v1/users/:id', { id: '@id' }, {
                    update: {
                        method: 'PUT' // this method issues a PUT request
                    }
                });
            }])
        .factory('Appointment', ['$resource',
            function ($resource) {
                return $resource('/api/v1/appointment/:id');
            }]);
});