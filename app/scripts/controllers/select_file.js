angular.module('milsApp')
  .controller('SelectFileCtrl', function ($scope, $location, $window, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.bodyClass = "bg-letter";
  });
