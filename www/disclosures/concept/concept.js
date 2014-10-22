'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, $stateParams, reportElements){	
    $scope.reportElements = reportElements;
    $scope.nav.concept = $stateParams.concept;
    $scope.nav.fiscalYear = $stateParams.fiscalYear;
    $scope.nav.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.nav.tag = $stateParams.tag;
    $scope.nav.aid = undefined;
    $scope.nav.company = 'Company';
    $scope.nav.page = 'company';
})
;