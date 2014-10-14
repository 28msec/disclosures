'use strict';

angular
.module('disclosures')
.controller('FactCtrl', function($scope, $stateParams, $sce, fact){
    $scope.concept = $stateParams.concept;
    $scope.aid = $stateParams.aid;
    $scope.concept = $stateParams.concept;
    $scope.fiscalYear = $stateParams.fiscalYear;
    $scope.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.tag = $stateParams.tag;
    if (fact.FactTable && fact.FactTable.length > 0) {
	    $scope.factValue = $sce.trustAsHtml(fact.FactTable[0].Value);
	    $scope.factEntity = fact.FactTable[0].EntityRegistrantName;
	    $scope.factFiscalYear = fact.FactTable[0].Aspects['sec:FiscalYear'];
	    $scope.factFiscalPeriod = fact.FactTable[0].Aspects['sec:FiscalPeriod'];
        $scope.missing = false;
    } else {
    	$scope.missing = true;
    }
});
