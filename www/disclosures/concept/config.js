'use strict';

angular
.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures.start.filter.disclosure.concept', {
        url: '/:concept',
        views : {
            'main@disclosures': {
                templateUrl: 'disclosures/concept/concept.html',
                controller: 'ConceptCtrl',
                resolve: {
                    reportElements: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                        var params = {
                            report : 'Disclosures',
                            name: 'name=' + encodeURIComponent($stateParams.concept)
                        };

                        DisclosuresAPI.addToken(params).addFilter(params, $stateParams);
                        DisclosuresAPI.setAid(null);
                        return DisclosuresAPI.Queries.listReportElements(params)
                            .then(function(elements){
                                return elements.ReportElements;
                            });
                    }]
                }
            }
        }

    });
});
