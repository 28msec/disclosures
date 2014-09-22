'use strict';

angular
.module('disclosures')
.controller('FactCtrl', function($scope, $stateParams, $sce, fact){
    $scope.concept = $stateParams.concept;
    $scope.aid = $stateParams.aid;

    $scope.factValue = $sce.trustAsHtml(fact.FactTable[0].Value);
    $scope.factEntity = fact.FactTable[0].EntityRegistrantName;
    $scope.factFiscalYear = fact.FactTable[0].Aspects['sec:FiscalYear'];
    $scope.factFiscalPeriod = fact.FactTable[0].Aspects['sec:FiscalPeriod'];
});