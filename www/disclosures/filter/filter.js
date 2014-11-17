'use strict';

angular
.module('disclosures')
.controller('FilterCtrl', [ '$scope', 'DisclosuresAPI', 'filterParameters', function($scope, DisclosuresAPI, filterParameters){
	
    $scope.filter = DisclosuresAPI.filter;
    $scope.filterParameters = filterParameters;
    
    $scope.nav.page = 'filter';   

    $scope.$watch('filter', $scope.filterChange, true);

}])
;