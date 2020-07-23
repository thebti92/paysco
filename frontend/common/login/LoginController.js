var loginModule = angular.module('module.login', []);


loginModule.controller('LoginController', function($scope, $rootScope, Auth, $state) {
    window.ngsc = $rootScope;

    $rootScope.user = {
        loggedin: false,
        object: {}
    };

//to be deleted in production
    $scope.form = {
        username: '',
        password: ''
    };

    $scope.logIn = function() {
        Auth.getUser($scope.form).then(function(user) {
            $rootScope.user.loggedin = true;
            $rootScope.user.object = user;
            $state.go('manage.student');
        }, function(error) {
            alert('Impossible de se connecter : '+error);
        });
    };

});
