'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, $stateParams, reportElements){	
    $scope.reportElements = reportElements;
    $scope.concept = $stateParams.concept;
    $scope.fiscalYear = $stateParams.fiscalYear;
    $scope.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.tag = $stateParams.tag;
})
;