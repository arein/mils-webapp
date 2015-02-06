angular.module('milsApp')
  .controller('SelectFileCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', '$state', function ($scope, $location, $window, $rootScope, $upload, repository, $state) {
    $rootScope.bodyClass = "bg-letter";

    $scope.$watch('files', function() {
      $scope.error = "";
      repository.files = $scope.files;

        console.log($scope.files);

        if (typeof $scope.files === "undefined") {
            return; // base Case
        }

        if ($scope.files.length == 0) {
            $scope.error = "You have to select at least one Pdf.";
            return;
        }

        if ($scope.files.length > 1) {
            $scope.error = "You may not select more than one file.";
            return;
        }

        var file = $scope.files[0];
        console.log(file);

        if (file.type != "application/pdf") {
            $scope.error = "The file you've selected does not appear to be a Pdf.";
            return;
        }

        if (file.size > 2000000) {
            $scope.error = "The selected file is too big. We currently only support Pdfs up to 2mb.";
            return;
        }

        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            repository.letter.pdf = btoa(binaryString);
            $state.go('two');
        };

        if (typeof $scope.files !== "undefined" && $scope.files.length > 0) reader.readAsBinaryString($scope.files[0]);
    });
  }]);
