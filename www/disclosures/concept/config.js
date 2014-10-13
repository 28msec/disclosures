'use strict';

angular
.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures.concept', {
        url: '/:year/:period/:tag/:concept',
        templateUrl: 'disclosures/concept/concept.html',
        controller: 'ConceptCtrl',
        resolve: {
            reportElements: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                var params = {
                	report : 'Disclosures',
                    name: 'name=' + encodeURIComponent($stateParams.concept)
                };
                DisclosuresAPI.filter.fiscalPeriod = $stateParams.period;
                DisclosuresAPI.filter.fiscalYear = Number.isNaN($stateParams.year) ? $stateParams.year : Number($stateParams.year);
                DisclosuresAPI.filter.tag = $stateParams.tag ? $stateParams.tag : null  ;
                console.log($stateParams.tag);

                DisclosuresAPI.addToken(params).addFilter(params);
                DisclosuresAPI.setAid(null);
                return DisclosuresAPI.Queries.listReportElements(params)
                .then(function(elements){                	
                    return elements.ReportElements;
                });
            }]
        }
    });
});
