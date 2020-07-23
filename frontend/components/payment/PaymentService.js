paymentModule.factory('PaymentService', function(DB_URL, $q) {



    return { 

        tax : function(){
        var fs = require('fs');
        var path = require('path');
        var sTax = fs.readFileSync(path.join(DB_URL, '/taxe.db'));
        return Number(sTax);


        },
     
            
    UpdateIdFacture: function() {
            var defer = $q.defer();
            var Datastore = require('nedb'),
            path = require('path');
            db = {};
            db.dbFilePath = new Datastore({
                filename: DB_URL + '/dbFilePath.db',
                autoload: true
            });

     db.dbFilePath.findOne( { _id: '__autoid__' }, function(err, doc) {
            if ("chaine" == "undefined") {
                defer.reject("Are trying to insert an empty student?");
            } else {
                db.dbFilePath.update({
                    _id: '__autoid__'
                }, {
                    $set: {value: ++doc.value} 
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.dbFilePath.persistence.compactDatafile();
                        defer.resolve(doc.value);
                    }
                });

            }
           
        });
     return defer.promise;
     
        },



          UpdateIdFactureParam: function(toEditParam) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
            path = require('path');
            db = {};
            db.dbFilePath = new Datastore({
                filename: DB_URL + '/dbFilePath.db',
                autoload: true
            });

     db.dbFilePath.findOne( { _id: '__autoid__' }, function(err, doc) {
            if ("chaine" == "undefined") {
                defer.reject("Are trying to insert an empty student?");
            } else {
                db.dbFilePath.update({
                    _id: '__autoid__'
                }, {
                    $set: {value: toEditParam } 
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.dbFilePath.persistence.compactDatafile();
                        defer.resolve(doc.value);
                    }
                });

            }
           
        });
     return defer.promise;
     
        },


        getNumFacture: function() {
             var defer = $q.defer();
            
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.dbFilePath = new Datastore({
                filename: DB_URL + '/dbFilePath.db',
                autoload: true
            });

            db.dbFilePath.findOne({_id: '__autoid__'}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(pmts);
                }


            });


            return defer.promise;

        },

 
      timbre : function(){
        var fs = require('fs');
        var path = require('path');
        var sTimbre = fs.readFileSync(path.join(DB_URL, '/timbre.db'));
        return Number(sTimbre);


        },


        getPaymentById: function(id) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            db.payments.findOne({_id:id}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(pmts);
                }


            });
            return defer.promise;

        },

        getAllPayments: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            db.payments.find({}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(pmts);
                }


            });


            return defer.promise;

        },

        removePayment: function(payment) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            if (typeof payment === "undefined") {
                defer.reject("Are trying to delete an empty payment?");
            } else {
                db.payments.remove({
                    _id: payment._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        },

        insertPayment: function(payment) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            if (typeof payment === "undefined") {
                defer.reject("Are trying to insert an empty payment?");
            } else {
                db.payments.insert(payment, /*{
                    firstname: payment.firstname,
                    lastname: payment.lastname,
                    _levelId: payment._levelId,
                    class: payment.class,
                    price: payment.price,
                    products: payment.products
                }*/ function(err, newPayment) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(newPayment);
                    }
                });

            }
                return defer.promise;
        },

/*
     insertFacture: function(facture) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.factures = new Datastore({
                filename: DB_URL + '/factures.db',
                autoload: true
            });

            if (typeof facture === "undefined") {
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

        ,
        }
*/
 upsertPayment: function(payment) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            if (typeof payment === "undefined") {
                defer.reject("Are trying to insert an empty payment?");
            } else {
                db.payments.update({
                    _id: payment._id
                }, {
                    amount:{
                    
                    payedAmount: payment.amount.payedAmount,
                    brutAmount: payment.amount.brutAmount,
                    cheques: payment.amount.cheques
                 },
                    currentPayedProd: angular.copy(payment.currentPayedProd),
                    datePayment : payment.datePayment ,
                    modePay : payment.modePay ,
                    firstname: payment.firstname,
                    lastname: payment.lastname,
                    _levelId: payment._levelId,
                    class: payment.class,
                    price: payment.price
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(std);
                    }
                });

            }
                return defer.promise;
        }


    };

});