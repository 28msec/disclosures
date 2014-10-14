'use strict';

angular
.module('disclosures')
.controller('FactCtrl', function($scope, $stateParams, $sce, fact){
    $scope.concept = $stateParams.concept;
    $scope.nav.aid = $stateParams.aid;
    $scope.nav.concept = $stateParams.concept;
    $scope.nav.fiscalYear = $stateParams.fiscalYear;
    $scope.nav.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.nav.tag = $stateParams.tag;
    $scope.nav.page = "fact";
    if (fact.FactTable && fact.FactTable.length > 0) {
	    $scope.factValue = $sce.trustAsHtml(fact.FactTable[0].Value);
	    $scope.factEntity = fact.FactTable[0].EntityRegistrantName;
	    $scope.factFiscalYear = fact.FactTable[0].Aspects['sec:FiscalYear'];
	    $scope.factFiscalPeriod = fact.FactTable[0].Aspects['sec:FiscalPeriod'];
        $scope.nav.company = fact.FactTable[0].EntityRegistrantName;
        $scope.missing = false;
    } else {
        $scope.nav.company = $stateParams.aid;
    	$scope.missing = true;
    }
});
