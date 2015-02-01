angular.module('milsApp')
    .controller('MapCtrl', ['$scope', '$location', '$window', '$rootScope', '$upload', 'repository', "leafletData", "leafletBoundsHelpers", function ($scope, $location, $window, $rootScope, $upload, repository, leafletData, leafletBoundsHelpers) {
        $rootScope.bodyClass = "map";

        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 10}
        });

        leafletData.getMap().then(function(map) {
            //L.GeoIP.centerMapOnPosition(map, 15);
        });

        console.log("map started");
    }]);
