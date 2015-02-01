/**
 * Created by arein on 01/02/15.
 */
angular.module('milsApp')
.service("repository", function Repository() {
        var repository = this;
        repository.letter = {
            recipient: {
                name: "Alexander-Derek Rein",
                "address1": "Irmgardstr. 15",
                "city": "Munich",
                "zip": "81479",
                "countryIso": "DE"
            }
        };
    });