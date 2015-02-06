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
        //console.log("running app");
        $rootScope.$on("$stateChangeStart", function(event, toState, toStateParams, fromState, fromStateParams) {

            if (fromState.name === "" && toState.name !== "index") {
                event.preventDefault();
                $state.go("index");
            } else if (toState.name == "index") {

            } else if (!isValidTransition(fromState.name, toState.name)) {
                event.preventDefault();
                //$state.go("index", {fallback: true});
            }
        });
});

function isValidTransition(from, to) {
    return true;
    console.log("From: " + from);
    console.log("To: " + to);
    if (from == "" && to == "index") return true;
    if (from == "index" && to == "two") return true;
    if (from == "two" && to == "map") return true;
    if (from == "map" && to == "pay") return true;
    if (from == "pay" && to == "thanks") return true;
    return false;
}