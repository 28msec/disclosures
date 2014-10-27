'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', ['$scope', '$stateParams', 'reportElements', function($scope, $stateParams, reportElements){
    $scope.reportElements = reportElements;
    $scope.conceptLabel = reportElements.length > 0 ? reportElements[0].Label : $stateParams.concept;
    $scope.nav.concept = $stateParams.concept;
    $scope.nav.fiscalYear = $stateParams.fiscalYear;
    $scope.nav.fiscalPeriod = $stateParams.fiscalPeriod;
    $scope.nav.tag = $stateParams.tag;
    $scope.nav.aid = undefined;
    $scope.nav.company = 'Company';
    $scope.nav.page = 'company';
}])
;