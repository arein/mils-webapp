'use strict';

/**
 * @ngdoc function
 * @name milsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milsApp
 */
angular.module('milsApp')
  .controller('EnterAddressCtrl', function ($scope, $http, countries, $rootScope, repository, $state, SERVER) {
    $scope.addressQueried = false;
    $scope.letter = repository.letter;
    $scope.countries = countries;
    $rootScope.bodyClass = "bg-grey";

    $scope.submit = function submit() {
      var form = $(".address_form")[0];
      if(typeof form.checkValidity === "undefined" || form.checkValidity()) {
        $state.go('map');
      }
    };

    $scope.validateAddress = function validateAddress() {
      if ($scope.addressQueried === false && hasAddress($scope.letter.recipient)) {
        $scope.addressQueried = true;

        // Query server
        var address = $scope.letter.recipient.address1 + ", " + $scope.letter.recipient.city;
        var responsePromise = $http.post(SERVER + "/geocode", {address: address});

        responsePromise.success(function(data, status, headers, config) {
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