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
            },
            creditcard: {
                number: "4111 1111 1111 1111",
                cvv: "153",
                date: "02/2015"
            },
            address: {
                name: "Alexander-Derek Rein",
                "line1": "Irmgardstr. 15",
                "city": "Munich",
                "postalCode": "81479",
                "country": "DE"
            },
            emailAddress: "adr@ceseros.de",
            price: "2.22"
        };
    });