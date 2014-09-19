'use strict';

angular.module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.concept.fact', {
                url: '/:aid',
                templateUrl: 'disclosures/fact/fact.html',
                controller: 'FactCtrl',
                resolve: {
                    reportElements: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                        var params = {
                            map: 'Disclosures',
                            concept: $stateParams.concept,
                            aid: $stateParams.aid
                        };
                        DisclosuresAPI.addToken(params);
                        return DisclosuresAPI.Queries.listFacts(params).then(function(data){
                            console.log(data);
                            return data;
                        });
                    }]
                }
            });
    });
