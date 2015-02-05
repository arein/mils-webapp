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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'ui.bootstrap',
    'angularFileUpload'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state("index", {
       url: "",
       controller: "SelectFileCtrl",
       templateUrl: "views/select_file.html"
    })
    .state("two", {
        url: "",
        controller: "EnterAddressCtrl",
        templateUrl: "views/enter_address.html"
    })
    .state("pay", {
        url: "/pay/:letter_id",
        controller: "PayCtrl",
        templateUrl: "views/pay.html"
    })
    .state("thanks", {
        url: "/thank-you",
        controller: "ThankYouCtrl",
        templateUrl: "views/thank_you.html"
    })
    .state("map", {
        url: "/map",
        controller: "MapCtrl",
        templateUrl: "views/map.html"
    });
  });