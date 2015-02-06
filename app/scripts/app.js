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
        url: "/enter-address",
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
  })
  .run(function($rootScope, $state) {
        console.log("running app");
        $rootScope.$on("$stateChangeStart", function(event, toState, toStateParams, fromState, fromStateParams) {
            if (fromState.name == "map" && toState.name == "two") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "map" && toState.name == "index") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "pay" && toState.name == "map") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "pay" && toState.name == "two") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "pay" && toState.name == "index") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "thanks" && toState.name == "pay") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "thanks" && toState.name == "map") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "thanks" && toState.name == "two") {
                event.preventDefault();
                //$state.go("index");
            } else if (fromState.name == "thanks" && toState.name == "index") {
                event.preventDefault();
                //$state.go("index");
            }
        });
});