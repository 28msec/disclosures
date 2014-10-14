'use strict';

angular.module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.fact', {
                url: '/:fiscalYear/:fiscalPeriod/:tag/:concept/:aid',
                templateUrl: 'disclosures/fact/fact.html',
                controller: 'FactCtrl',
                resolve: {
                    fact: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                        var params = {
                            map: 'Disclosures',
                            concept: $stateParams.concept,
                            aid: $stateParams.aid
                        };
                        DisclosuresAPI.filter.fiscalPeriod = $stateParams.fiscalPeriod;
                        DisclosuresAPI.filter.fiscalYear = Number.isNaN($stateParams.fiscalYear) ? $stateParams.fiscalYear : Number($stateParams.fiscalYear);
                        DisclosuresAPI.filter.tag = $stateParams.tag ? $stateParams.tag : null;

                        DisclosuresAPI.addToken(params);
                        DisclosuresAPI.setAid($stateParams.aid);
                        return DisclosuresAPI.Queries.listFacts(params).then(function(data){
                            return data;
                        });
                    }]
                }
            });
    });
