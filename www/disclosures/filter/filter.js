'use strict';

angular
.module('disclosures')
.controller('FilterCtrl', function($scope, DisclosuresAPI, filterParameters){
	
    $scope.filter = DisclosuresAPI.filter;
    $scope.filterParameters = filterParameters;

    $scope.selectEntity = function(entity) {
        $scope.filter.entities.push(entity);
    };

    $scope.searchEntity = function() {
        var matches = [];
        var searchTerm = $scope.filter.searchEntity.toLowerCase();
        if(searchTerm !== '') {
            filterParameters.entities.forEach(function(entity){
                if(entity.name.toLowerCase().indexOf(searchTerm) !== -1) {
                    matches.push(entity);
                }
            });
        }
        $scope.entitiesCompletion = matches;
    };
    
    $scope.isSelected = function (list,item) {
    	return list.indexOf(item) > -1;
    };
    
    $scope.toggleSelection = function (list,item) {
        var idx = list.indexOf(item);
       
        if (idx > -1) {
          list.splice(idx, 1);
        } else {
          list.push(item);
        }
    };
   
})
;