'use strict';

angular
.module('disclosures')
.controller('FilterCtrl', function($scope, DisclosuresAPI, filterParameters){
	
    $scope.filter = DisclosuresAPI.filter;
    $scope.filterParameters = filterParameters;

    $scope.recentYears = filterParameters.years.slice(0,4);
    $scope.allYears = false;

    $scope.nav.page = 'filter';

    $scope.showAllYears = function() {
        $scope.allYears = true;
    };

    $scope.$watch('filter', $scope.filterChange, true);

})
;