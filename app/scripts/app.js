'use strict';

/**
 * @ngdoc overview
 * @name milsApp
 * @description
 * # milsApp
 *
 * Main module of the application.
 */
angular
  .module('milsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/select-file', {
        templateUrl: 'views/select_file.html',
        controller: 'SelectFileCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
