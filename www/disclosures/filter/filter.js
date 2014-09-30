'use strict';

angular
.module('disclosures')
.controller('FilterCtrl', function($scope, filterParameters){
    $scope.filter = {
        entities: []
    };

    $scope.selectEntity = function(entity) {
        $scope.filter.entities.push(entity);
    };

    $scope.searchEntity = function() {
        var matches = [];
        var searchTerm = $scope.filter.searchEntity.toLowerCase();
        if(searchTerm != '') {
            filterParameters.entities.forEach(function(entity){
                if(entity.name.toLowerCase().indexOf(searchTerm) !== -1) {
                    matches.push(entity);
                }
            });
        }
        $scope.entitiesCompletion = matches;
    };
    //console.log(filterParameters);
})
;