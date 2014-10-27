'use strict';

angular
.module('disclosures')
.controller('FactCtrl', [ '$scope', '$stateParams', '$sce', 'fact', function($scope, $stateParams, $sce, fact){
    $scope.concept = $stateParams.concept;
    $scope.nav.aid = $stateParams.aid;
    $scope.nav.concept = $stateParams.concept;
    $scope.nav.fiscalYear = $stateParams.fiscalYear;
    $scope.nav.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.nav.tag = $stateParams.tag;
    $scope.nav.page = 'fact';
    $scope.nav.company = $stateParams.company;
    if (fact.FactTable && fact.FactTable.length > 0) {
	    $scope.factValue = $sce.trustAsHtml(fact.FactTable[0].Value);
	    $scope.factEntity = $stateParams.company;
	    $scope.factFiscalYear = fact.FactTable[0].Aspects['sec:FiscalYear'];
	    $scope.factFiscalPeriod = fact.FactTable[0].Aspects['sec:FiscalPeriod'];
        $scope.missing = false;
    } else {
    	$scope.missing = true;
    }
}]);
