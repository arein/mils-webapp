'use strict';

/**
 * @ngdoc function
 * @name milsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milsApp
 */
angular.module('milsApp')
  .controller('EnterAddressCtrl', function ($scope, $http, countries, $rootScope, repository, $state) {
    $scope.addressQueried = false;
    $scope.letter = repository.letter;
    $scope.countries = countries;
    $rootScope.bodyClass = "bg-grey";

    $scope.submit = function submit() {
      console.log($scope.letter.recipient);
       $state.go('map');
    };

    $scope.validateAddress = function validateAddress() {
      if ($scope.addressQueried === false && hasAddress($scope.letter.recipient)) {
        $scope.addressQueried = true;

        // Query server
        var address = $scope.letter.recipient.address1 + ", " + $scope.letter.recipient.city;
        console.log("address: %s", address);
        var responsePromise = $http.post("http://localhost:3000/geocode", {address: address});

        responsePromise.success(function(data, status, headers, config) {
            console.log(data);
            $scope.letter.recipient.zip = data.zipcode;
            $scope.letter.recipient.state = data.stateCode;
            $scope.letter.recipient.countryIso = data.countryCode;
        });
        responsePromise.error(function(data, status, headers, config) {
            //alert("AJAX failed!");
        });
      }
    };
  });

function hasAddress(recipient) {
  if (typeof recipient.address1 === "undefined" || recipient.address1 === '') return false;
  if (typeof recipient.city === "undefined" || recipient.city === '') return false;
  return true;
}