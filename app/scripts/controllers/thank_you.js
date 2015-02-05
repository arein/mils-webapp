/**
 * Created by arein on 05/02/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name milsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milsApp
 */
angular.module('milsApp')
    .controller('ThankYouCtrl', function ($scope, $rootScope) {
        $rootScope.bodyClass = "bg-letter";
    });
