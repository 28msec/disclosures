'use strict';

angular.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures.concept', {
        url: '/:concept',
        templateUrl: 'disclosures/concept/concept.html',
        controller: 'ConceptCtrl'
    });
});
