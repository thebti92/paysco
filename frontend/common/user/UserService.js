userModule.factory('UserService', function(DB_URL, $q) {



    return {


        getAllUsers: function() {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.users = new Datastore({
                filename: DB_URL + '/users.db',
                autoload: true
            });

            db.users.find({}, function(err, users) {
                if (err){
                    console.log(err);
                    defer.reject('Error in the query, err = '+err);
                }
                else{
                    defer.resolve(users);
                }
            });

            return defer.promise;
        },

        removeUser: function(user) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.users = new Datastore({
                filename: DB_URL + '/users.db',
                autoload: true
            });
            if (typeof user === "undefined") {
                defer.reject("Are trying to delete an empty user?");
            } else {
                db.users.remove({
                    _id: user._id
                }, {}, function(err, numRemoved) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.users.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        },
        upsertUser: function(user) {
            var defer = $q.defer();


            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.users = new Datastore({
                filename: DB_URL + '/users.db',
                autoload: true
            });

            if (typeof user === "undefined") {
                defer.reject("Are trying to insert an empty user?");
            } else {

                db.users.update({
                    _id: user._id
                }, {
                    username: user.username,
                    password: user.password,
                    admin: user.admin,
                    email: user.email,
                    asp: user.asp
                }, {
                    upsert: true
                }, function(err, numReplaced, user) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.users.persistence.compactDatafile();
                        // console.log('user = ' + JSON.stringify(user));
                        defer.resolve(user);
                    }
                });
            }
            return defer.promise;
        }
    };

});
