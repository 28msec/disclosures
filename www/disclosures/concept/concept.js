'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, $stateParams, reportElements){	
    $scope.reportElements = reportElements;
    $scope.concept = $stateParams.concept;
    $scope.year = $stateParams.year;
    $scope.period = $stateParams.period;
    $scope.tag = $stateParams.tag;
})
;