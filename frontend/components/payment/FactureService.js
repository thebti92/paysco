paymentModule.factory('FactureService', function(DB_URL, $q) {



    return { 


     insertFacture: function(facture) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.factures = new Datastore({
                filename: DB_URL + '/factures.db',
                autoload: true
            });

            if (typeof facture == "undefined") {
                defer.reject("Are trying to insert an empty facture?");
            } else {
                db.factures.insert(facture, function(err, newFacture) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.factures.persistence.compactDatafile();
                        defer.resolve(newFacture);
                    }
                });

            }
                return defer.promise;

        }




    };

});