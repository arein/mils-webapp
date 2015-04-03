angular.module('milsApp')
  .controller('SelectFileCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', '$state', '$http', function ($scope, $location, $window, $rootScope, $upload, repository, $state, $http) {
    $rootScope.bodyClass = "bg-letter";


    $scope.$watch('files', function() {
      $scope.error = "";
      repository.files = $scope.files;

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

    $scope.dropboxSuccess = function(files) {
        // Ran into issues when using return instead of if/else
        if (files.length != 1) {
            $scope.error = "Please select exactly one file.";
            return;
        } else if (files[0].bytes > 7000000) {
            $scope.error = "The selected file is too big. We currently only support Pdfs up to 2mb.";
        } else {
            fetchBlob(files[0].link, function (data) {
                repository.letter.pdf = _arrayBufferToBase64(data);
                $state.go('two');
            });
            /*
            $http.get(files[0].link).
              success(function(data, status, headers, config) {
                repository.letter.pdf = btoa(data);
                $state.go('two');
              }).
              error(function(data, status, headers, config) {
                $scope.error = "An error occurred when trying to download the file from Dropbox: " + data;
              });*/
        }
    }

    // Dropbox
    $scope.button = Dropbox.createChooseButton(getDropboxOptions($scope.dropboxSuccess));
    $("#cloud").append($scope.button);

  }]);

function fetchBlob(uri, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', uri, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var blob = this.response;
      if (callback) {
        callback(blob);
      }
    }
  };
  xhr.send();
};

// http://stackoverflow.com/a/9458996/128597
function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

function getDropboxOptions(success) {
    return {
        // Required. Called when a user selects an item in the Chooser.
        success: success,

        // Optional. Called when the user closes the dialog without selecting a file
        // and does not include any parameters.
        cancel: function() {

        },

        // Optional. "preview" (default) is a preview link to the document for sharing,
        // "direct" is an expiring link to download the contents of the file. For more
        // information about link types, see Link types below.
        linkType: "direct", // or "direct"

        // Optional. A value of false (default) limits selection to a single file, while
        // true enables multiple file selection.
        multiselect: false, // or true

        // Optional. This is a list of file extensions. If specified, the user will
        // only be able to select files with these extensions. You may also specify
        // file types, such as "video" or "images" in the list. For more information,
        // see File types below. By default, all extensions are allowed.
        extensions: ['.pdf'],
    };
}
