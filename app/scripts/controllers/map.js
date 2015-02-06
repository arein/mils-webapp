angular.module('milsApp')
    .controller('MapCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', "leafletData", "leafletBoundsHelpers", "$http", function ($scope, $location, $window, $rootScope, $upload, repository, leafletData, leafletBoundsHelpers, $http) {
        $rootScope.bodyClass = "map";
        $scope.letter = repository.letter;

        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 10}
        });

        angular.extend($scope, {
            defaults: {
                tileLayer: "http://{s}.tiles.mapbox.com/v4/arein.l50jo2mo/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXJlaW4iLCJhIjoiVUZoclFIayJ9.eMMfnrQIzUq7QghFrYk8jQ",
                maxZoom: 14,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            }
        });//erickreutz.l24jh22o

        leafletData.getMap().then(function(map) {
            //L.GeoIP.centerMapOnPosition(map, 15);
        });

        // Query server
        var letter = {
            pdf: repository.letter.pdf,
            recipientName: repository.letter.recipient.name,
            recipientCompany: repository.letter.recipient.company,
            recipientAddress1: repository.letter.recipient.address1,
            recipientAddress2: repository.letter.recipient.address2,
            recipientCity: repository.letter.recipient.city,
            recipientState: repository.letter.recipient.state,
            recipientPostalCode: repository.letter.recipient.zip,
            recipientCountryIso: repository.letter.recipient.countryIso
        };

        var responsePromise = $http.post("http://localhost:3000/letters", letter);

        responsePromise.success(function(data, status, headers, config) {
            console.log(data);
            $('#uploading-pdf').hide();
            $('#uploading-completed').show();
            repository.letter.price = data.financialInformation.price;
            repository.letter.id = data._id;
            repository.letter.printCity = data.printInformation.city;
            repository.letter.printCountry = data.printInformation.country;

            // Show Recipent and Destination on the Map
            var address = repository.letter.recipient.address1 + ", " + repository.letter.recipient.city;
            var responsePromise = $http.post("http://localhost:3000/geocode", {address: address});

            responsePromise.success(function(data, status, headers, config) {

            });

            responsePromise.error(function(data, status, headers, config) {
                //alert("AJAX failed!");
            });

            // Show Recipent and Destination on the Map
            var address = repository.letter.printCity + ", " + repository.letter.printCountry;
            var responsePromise = $http.post("http://localhost:3000/geocode", {address: address});

            responsePromise.success(function(data, status, headers, config) {
            });

            responsePromise.error(function(data, status, headers, config) {
                //alert("AJAX failed!");
            });
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

        console.log("map started");
    }]);
