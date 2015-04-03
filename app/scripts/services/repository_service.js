angular.module('milsApp')
.service("repository", ['ENV', function Repository(ENV) {
        var repository = this;
        if (ENV === "development") {
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
        } else {
            repository.letter = {};
        }
    }]);