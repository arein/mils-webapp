angular.module('milsApp')
  .controller('SelectFileCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', function ($scope, $location, $window, $rootScope, $upload) {
  	console.log("go");
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.bodyClass = "bg-letter";

    $scope.$watch('files', function() {
      $scope.upload = $upload.upload({
        url: 'http://localhost:3000/letters',
        data: {myObj: $scope.myModelObj},
        file: $scope.files
      }).progress(function(evt) {
        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
      }).success(function(data, status, headers, config) {
        console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
      });
    });
  }]);
