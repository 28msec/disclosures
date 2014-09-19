'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, reportElements){
        console.log(reportElements);
    $scope.reportElements = reportElements;
    $scope.select = function(aid) {
        $scope.aid = aid;
    };
})
;