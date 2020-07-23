var userModule = angular.module('module.user', []);

userModule.controller('UserController', function(_,$q,$scope, $filter, $modal, NgTableParams, UserService, users) {
    $scope.toDeleteUser = {};
    $scope.toEditUser = {};
    $scope.toInserUser = {};

    $scope.users = users;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.users
    });

    $scope.updateUser = function(user) {
        UserService.upsertUser(user).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditUser = {};
        });
    }
    $scope.insertUser = function(user) {
        UserService.upsertUser(user).then(function(usr) {
            $scope.users.push(usr);
            $scope.tableParams.reload();
            $scope.toInserUser = {};
        },function(error){
            alert('Impossible de créer cet utilisateur, detail : '+error);
        });
    }
   
    $scope.deleteUser = function(user) {
        UserService.removeUser(user).then(function(numDeleted) {
            indexToBeDeleted = _.indexOf(_.pluck($scope.users, '_id'), user._id);
            $scope.users.splice(indexToBeDeleted,1);     
            $scope.tableParams.reload();
            $scope.toDeleteUser = {};
        },function(error){
            alert('Impossible de supprimer cet utilisateur, detail : '+error);
        });
    }

    $scope.loadEditedUser = function(user) {
        $scope.toEditUser = user;
    }
    $scope.loadDeletedUser = function(user) {
        $scope.toDeleteUser = user;
    }
    $scope.loadInsertedUser = function(user) {
        $scope.toInserUser = user;
    }


});
