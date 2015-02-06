/**
 * Created by arein on 01/02/15.
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
    .controller('PayCtrl', function ($scope, repository, $stateParams, countries, $http, $rootScope, $state) {

        $scope.countries = countries;
        $rootScope.bodyClass = "bg-grey";
        $scope.disabled = false;
        $scope.letter = repository.letter;
        var braintree = Braintree.create("MIIBCgKCAQEAwAPJTgb9r2B3gaWl9DILU3co12Ova1DerGuatqJbqqM5C3IOXes0L6HILz5lCD4rirWuKhMpxYus1ZuHgdiZTnuYLYe3J20ysLNW4kuX9frvsuI08+AWPY9vN/arVupVjHIgILnVScmlU0oNZMVokm+TIbob7CGkqznt4jLgO+ri4oGvkmC8f3aRwJpKrZtUScyNRcrZPa1vXvD6Z2eYt4WFMbiaWy74Oih9zlfwp+pYSib3DLsDN1a2Fys2A4sQMJMePdnlu691yLQ4yVsQbJG6bRErXu8JeC5Ws2Ku3DwwNLCnQJxwyVxyOArI2jQC3mLUtMf+X74GbPnXdMTiVQIDAQAB");
        braintree.onSubmitEncryptForm('braintree-payment-form');

        $scope.submit = function submit() {
            braintree.encryptForm('braintree-payment-form');
            var content = $('#braintree-payment-form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});
            repository.letter.encryptedCreditCard = content;

            var paymentObject = {
                creditCard: content,
                address: repository.letter.address,
                emailAddress: repository.letter.emailAddress
            };

            $scope.disabled = true;
            var responsePromise = $http.post("http://localhost:3000/letters/" + $stateParams.letter_id, paymentObject);
            $(".payment .spinner").show();

            responsePromise.success(function(data, status, headers, config) {
                $scope.disabled = false;
                $state.go('thanks');
                $(".payment .spinner").hide();
            });
            responsePromise.error(function(data, status, headers, config) {
                $scope.disabled = false;
                $(".payment .submit").text("Retry");
                $(".payment-header h1").text("Payment Failed");
                $(".payment-header p").text("Error Message: " + data.error);
                $(".submit").text("Retry");
                $(".payment .spinner").hide();
            });

        }
    });
