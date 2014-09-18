'use strict';

angular
.module('disclosures')
.controller('ConceptCtrl', function($scope, concept){
        console.log(concept);
    $scope.concept = concept;
    $scope.select = function(aid) {
        $scope.aid = aid;
    };
})
;