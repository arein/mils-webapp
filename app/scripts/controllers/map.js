angular.module('milsApp')
    .controller('MapCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', "leafletData", "leafletBoundsHelpers", "$http", function ($scope, $location, $window, $rootScope, $upload, repository, leafletData, leafletBoundsHelpers, $http) {
        $rootScope.bodyClass = "map";
        $scope.letter = repository.letter;

        $scope.uploadCompleted = false;

        angular.extend($scope, {
            center: {
                lat: 37.7577,
                lng: -122.4376,
                zoom: 12},
            zoomControl:false,
            data: {markers: {}}
        });

        angular.extend($scope, {
            defaults: {
                tileLayer: "http://{s}.tiles.mapbox.com/v4/arein.l50jo2mo/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXJlaW4iLCJhIjoiVUZoclFIayJ9.eMMfnrQIzUq7QghFrYk8jQ",
                maxZoom: 14,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                },
                zoomControl:false
            }
        });

        $scope.moveUp = function () {
            moveContent(true, true, true);
            $('#uploading-pdf').hide();
            $('#payment-failed').hide();
            $('#uploading-completed').show();
        };

        $scope.retry = function() {
          $('#uploading-pdf').show();
          $('#payment-failed').hide();
          upload(repository, $http, leafletData, $scope);
        };

        // Move Content to the Top
        moveContent($scope.uploadCompleted);
        $( window ).resize(function() {
            if ($scope.uploadCompleted) {
                moveContent($scope.uploadCompleted, !$scope.uploadCompleted, !$scope.uploadCompleted, moveMapBelowContent);
            } else {
                moveContent($scope.uploadCompleted, !$scope.uploadCompleted, !$scope.uploadCompleted);
            }
        });

        upload(repository, $http, leafletData, $scope);

        /*
        firstPoint = {latitude: 28.635308, longitude: 77.22496};
        secondPoint = {latitude: 28.984461, longitude: 77.70641};
        addPolyLine(leafletData, firstPoint, secondPoint, $scope);
        */
    }]);

function moveContent(toTop, animate, resize, callback) {
    var top = $(this).height() / 2 - $(".content").height() / 2;
    if (toTop === true) top = 0;
    var fixed = top - 21;
    var css_object = {
        'margin-top' : fixed + "px"
    };

    if (typeof resize !== "undefined" && resize) css_object.height = "180px";

    if (typeof animate === "undefined" || !animate) {
        $('.content').css(css_object);
    } else {
        var time = 200;
        if (toTop) time = 1000;
        $('.content').animate(css_object, time, "swing", callback);
    }
}

function moveMapBelowContent() {
    var top = $(".content").height();
    var height = $("html").height() - $(".content").height();
    var css_object = {
        'height' : height + "px",
        'top' : top + "px"
    };
    $('.angular-leaflet-map').css(css_object);
}

function upload(repository, $http, leafletData, $scope) {
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

    var uploadPromise = $http.post("http://localhost:3000/letters", letter);

    uploadPromise.success(function(data, status, headers, config) {
        $scope.uploadCompleted = true;

        moveContent(true, true, true, moveMapBelowContent);
        $('#uploading-pdf').hide();
        $('#payment-failed').hide();
        $('#uploading-completed').show();

        repository.letter.pdf = undefined;
        repository.letter.price = data.financialInformation.price;
        repository.letter.id = data._id;
        repository.letter.printCity = data.printInformation.city;
        repository.letter.printCountry = data.printInformation.country;
        repository.letter.price = data.price;
        repository.letter.printInformation = data.printInformation;

        var mapObject = {};

        // Show Recipent and Destination on the Map
        var geoPromise1 = $http.post("http://localhost:3000/geocode", {address: getRecipientAddress(repository)});

        geoPromise1.success(function(data, status, headers, config) {
            mapObject.recipient = {};
            mapObject.recipient.latitude = data.latitude;
            mapObject.recipient.longitude = data.longitude;
            handleGeocodingCallback(mapObject, leafletData, $scope);
        });

        geoPromise1.error(function(data, status, headers, config) {
            console.log(data);
        });

        // Show Recipent and Destination on the Map
        var geoPromise2 = $http.post("http://localhost:3000/geocode", {address: getPrintingCompanyAddress(repository)});

        geoPromise2.success(function(data, status, headers, config) {
            mapObject.printing = {};
            mapObject.printing.latitude = data.latitude;
            mapObject.printing.longitude = data.longitude;
            handleGeocodingCallback(mapObject, leafletData, $scope);
        });

        geoPromise2.error(function(data, status, headers, config) {
            console.log(data);
        });
    });

    uploadPromise.error(function(data, status, headers, config) {
        $('#uploading-pdf').hide();
        $('#payment-failed').show();
    });
}

function getRecipientAddress(repository) {
    return repository.letter.recipient.address1 + ", " + repository.letter.recipient.city + ", " + repository.letter.recipient.zip + ", " + repository.letter.recipient.country;
}

function getPrintingCompanyAddress(repository) {
    return repository.letter.printInformation.city + ", " + repository.letter.printInformation.country;
}

function handleGeocodingCallback(mapInformation, leafletData, $scope) {
    if (typeof mapInformation.recipient === "undefined") return;
    if (typeof mapInformation.printing === "undefined") return;
    addPolyLine(leafletData, mapInformation.recipient, mapInformation.printing, $scope);
}

function addPolyLine(leafletData, firstPoint, secondPoint, $scope) {
    leafletData.getMap().then(function(map) {
        //L.GeoIP.centerMapOnPosition(map, 15);
        //map.scrollWheelZoom.disable();
        var pointA = new L.LatLng(firstPoint.latitude, firstPoint.longitude);
        var pointB = new L.LatLng(secondPoint.latitude, secondPoint.longitude);
        var pointList = [pointA, pointB];

        var firstpolyline = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 1,
            smoothFactor: 1

        });
        firstpolyline.addTo(map);
        var bounds = new L.LatLngBounds(pointList);
        map.fitBounds(bounds);
    });

    $scope.data.markers = {};
    angular.extend($scope.data, { angularInterpolatedMessage : "Angular interpolated message!"});
    angular.extend($scope.data, {
        markers: {
            m1: {
                lat: firstPoint.latitude,
                lng: firstPoint.longitude,
                compileMessage: false,
                message: "Recipient"
            },
            m3: {
                lat: secondPoint.latitude,
                lng: secondPoint.longitude,
                compileMessage: false,
                message: "Location of Selected Printing Company"
            }
        }
    });
}