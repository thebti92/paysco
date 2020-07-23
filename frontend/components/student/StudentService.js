studentModule.factory('StudentService', function(DB_URL, $q) {



    return {



 getStudentById: function(id) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            db.students.findOne({_id:id}, function(err, sdts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(sdts);
                }


            });
            return defer.promise;

        },

// ************************************************
    getCode: function() {
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


    UpdateCode: function() {
        
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
                    $set: {code: ++doc.code} 
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.dbFilePath.persistence.compactDatafile();
                        defer.resolve(doc.code);
                    }
                });

            }
           
        });
     return defer.promise;
     
        },

 // **********************************************

        getAllStudents: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            db.students.find({}, function(err, stds) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(stds);
                }


            });
            return defer.promise;

        },

        removeStudent: function(student) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            if (typeof student === "undefined") {
                defer.reject("Are trying to delete an empty student?");
            } else {
                db.students.remove({
                    _id: student._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.students.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        },
        upsertStudent: function(student) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            if (typeof student === "undefined") {
                defer.reject("Are trying to insert an empty student?");
            } else {
                db.students.update({
                    _id: student._id
                }, {
                    code: student.code,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    _levelId: student._levelId,
                    class: student.class,
                    price: student.price,
                    products: student.products,
                  //  factures: student.factures,
                   // timbre: student.timbre
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                       // db.students.persistence.compactDatafile();
                        defer.resolve(std);
                    }
                });

            }
                return defer.promise;
        }
    };

});
