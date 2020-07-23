invoiceModule.factory('InvoiceService', function(DB_URL, $q) {



    return { 



      

        tax : function(){
        var fs = require('fs');
        var path = require('path');
        var sTax = fs.readFileSync(path.join(DB_URL, '/taxe.db'));
        return Number(sTax);


        },
     

      timbre : function(){
        var fs = require('fs');
        var path = require('path');
        var sTimbre = fs.readFileSync(path.join(DB_URL, '/timbre.db'));
        return Number(sTimbre);


        },


        getFactureById: function(id) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.factures = new Datastore({
                filename: DB_URL + '/factures.db',
                autoload: true
            });

            db.factures.findOne({_id:id}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
//                    console.log("pmtsById___"+ pmts);
                    defer.resolve(pmts);
                }


            });
            return defer.promise;

        },

        getAllFactures: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.factures = new Datastore({
                filename: DB_URL + '/factures.db',
                autoload: true
            });

            db.factures.find({}, function(err, pmts) {
                if (err) {
//                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {

                   // console.log("pmtsALL____" + pmts);
                   // console.log("pmtsLENGHT____" + pmts.length);
                    defer.resolve(pmts);
                }
            });
             return defer.promise;
        },

        removeFacture: function(facture) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.factures = new Datastore({
                filename: DB_URL + '/factures.db',
                autoload: true
            });

            if (typeof facture === "undefined") {
                defer.reject("Are trying to delete an empty factures?");
            } else {
                db.factures.remove({
                    _id: facture._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.factures.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        }


    };

});
