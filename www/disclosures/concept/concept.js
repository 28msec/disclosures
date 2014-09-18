'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, concept){
    $scope.concept = concept;
    $scope.select = function(aid) {
        $scope.aid = aid;
    };
})
;