levelModule.factory('LevelService', function(DB_URL, $q) {
    return {

        getAllLevels: function() {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.levels = new Datastore({
                filename: DB_URL + '/levels.db',
                autoload: true
            });

            db.levels.find({}, function(err, lvs) {
                if (err) {
//                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {

                    defer.resolve(lvs);
                }

    
            });
            return defer.promise;
        },
        getLevelById: function(id) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
             db.levels = new Datastore({
                filename: DB_URL + '/levels.db',
                autoload: true
            });

            db.levels.findOne({
                _id: id
            }, function(err, lv) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {

                    if (typeof lv === "object" && lv != null) {
                        defer.resolve(lv);
                    } else {
                        defer.reject("Cannot find this level!");
                    }

                }
            });

            return defer.promise;
        },

        removeLevel: function(level) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.levels = new Datastore({
                filename: DB_URL + '/levels.db',
                autoload: true
            });

            if (typeof level === "undefined") {
                defer.reject("Are trying to delete an empty level?");
            } else {
                db.levels.remove({
                    _id: level._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.levels.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }

            return defer.promise;
        },
        upsertLevel: function(level) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.levels = new Datastore({
                filename: DB_URL + '/levels.db',
                autoload: true
            });

            if (typeof level === "undefined") {
                defer.reject("Are trying to insert/update an empty level?");
            } else {
                db.levels.update({
                    _id: level._id
                }, {
                    _id: level._id,
                    price: level.price
                }, {
                    upsert: true
                }, function(err, numReplaced, lv) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.levels.persistence.compactDatafile();
                        defer.resolve(lv);
                    }
                });
            }
            return defer.promise;
        }
    };

});
