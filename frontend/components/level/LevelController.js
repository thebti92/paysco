
var levelModule = angular.module('module.level', []);

levelModule.controller('LevelController', function(_, $q, NgTableParams,$scope,$rootScope,LevelService,levels) {


    $scope.toDeleteLevel = {};
    $scope.toEditLevel = {};
    $scope.toInserLevel = {};

    $scope.levels = levels;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.levels
    });

    $scope.updateLevel = function(level) {
        LevelService.upsertLevel(level).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditLevel = {};
        });
    }
    $scope.insertLevel = function(level) {
        LevelService.upsertLevel(level).then(function(usr) {
            $scope.levels.push(usr);
            $scope.tableParams.reload();
            $scope.toInserLevel = {};
        },function(error){
            alert('Impossible de créer ce Niveau, detail : '+error);
        });
    }
   
    $scope.deleteLevel = function(level) {
        LevelService.removeLevel(level).then(function(numDeleted) {
            indexToBeDeleted = _.indexOf(_.pluck($scope.levels, '_id'), level._id);
            $scope.levels.splice(indexToBeDeleted,1);     
            $scope.tableParams.reload();
            $scope.toDeleteLevel = {};
        },function(error){
            alert('Impossible de supprimer ce Niveau, detail : '+error);
        });
    }

    $scope.loadEditedLevel = function(level) {
        $scope.toEditLevel = level;
    }
    $scope.loadDeletedLevel = function(level) {
        $scope.toDeleteLevel = level;
    }
    $scope.loadInsertedLevel = function(level) {
        $scope.toInserLevel = level;
    }

});
