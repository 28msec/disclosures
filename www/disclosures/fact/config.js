'use strict';

angular.module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.fact', {
                url: '/:concept/:aid',
                templateUrl: 'disclosures/fact/fact.html',
                controller: 'FactCtrl',
                resolve: {
                    fact: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                        var params = {
                            map: 'Disclosures',
                            concept: $stateParams.concept,
                            aid: $stateParams.aid
                        };
                        DisclosuresAPI.addToken(params);
                        return DisclosuresAPI.Queries.listFacts(params).then(function(data){
                            return data;
                        });
                    }]
                }
            });
    });
