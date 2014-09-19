'use strict';

angular.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures.concept', {
        url: '/:concept',
        templateUrl: 'disclosures/concept/concept.html',
        controller: 'ConceptCtrl',
        resolve: {
            concept: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                var params = {
                    cik : ($stateParams.cik ? $stateParams.cik.split(',') : []),
                    tag : ($stateParams.tag ? $stateParams.tag.split(',') : []),
                    fiscalYear : ($stateParams.fiscalYear ? $stateParams.fiscalYear.split(',') : []),
                    fiscalPeriod : ($stateParams.fiscalPeriod ? $stateParams.fiscalPeriod.split(',') : []),
                    sic : ($stateParams.sic ? $stateParams.sic.split(',') : []),
                    map : 'Disclosures',
                    name: $stateParams.concept,
                    token: DisclosuresAPI.getToken()
                };
                return DisclosuresAPI.Queries.listReportElements(params).catch(function(error){
                    console.error(error);
                });
            }]
        }
    });
});
