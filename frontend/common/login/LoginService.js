loginModule.factory('Auth', function(DB_URL, $q) {

    return {

        getUser: function(data) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');

            db = {};
            db.users = new Datastore({
                filename: DB_URL + '/users.db',
                autoload: true
            });

            if (typeof data === "undefined") {
                defer.reject("Are trying to pass an empty information?");
            } else {
                db.users.findOne({
                    username: data.username,
                    password: data.password
                }, function(err, user) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        if (typeof user === "object" && user != null) {
                            defer.resolve(user);
                        } else {
                            defer.reject("Username ou Mot de passe incorrect");
                        }
                    }

                });
            }
            return defer.promise;
        }
    };

});
