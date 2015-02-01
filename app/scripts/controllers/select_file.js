angular.module('milsApp')
  .controller('SelectFileCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', 'state', function ($scope, $location, $window, $rootScope, $upload, repository, state) {
    $rootScope.bodyClass = "bg-letter";

    $scope.$watch('files', function() {
      console.log($scope.files);
      repository.files = $scope.files;

        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            repository.pdf = btoa(binaryString);
            state.go('EnterAddressCtrl');
        };

        if (typeof $scope.files !== "undefined" && $scope.files.length > 0) reader.readAsBinaryString($scope.files[0]);
    });
  }]);
