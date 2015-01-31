'use strict';

/**
 * @ngdoc function
 * @name milsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the milsApp
 */
angular.module('milsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
