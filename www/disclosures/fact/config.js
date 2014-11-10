'use strict';

angular.module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.start.filter.disclosure.concept.fact', {
                url: '/:aid/:company',
                views : {
                    'main@disclosures' : {
                        templateUrl: 'disclosures/fact/fact.html',
                        controller: 'FactCtrl',
                        resolve: {
                            fact: ['$stateParams', 'DisclosuresAPI', function($stateParams, DisclosuresAPI) {
                                var params = {
                                    map: 'Disclosures',
                                    concept: $stateParams.concept,
                                    aid: $stateParams.aid,
                                    fiscalPeriod : $stateParams.fiscalPeriod,
                                    fiscalYear : isNaN($stateParams.fiscalYear) ? $stateParams.fiscalYear : parseInt($stateParams.fiscalYear, 10),
                                    labels : true
                                };
                                DisclosuresAPI.filter.fiscalPeriod = $stateParams.fiscalPeriod;
                                DisclosuresAPI.filter.fiscalYear = isNaN($stateParams.fiscalYear) ? $stateParams.fiscalYear : parseInt($stateParams.fiscalYear, 10);
                                DisclosuresAPI.filter.tag = $stateParams.tag ? $stateParams.tag : null;

                                DisclosuresAPI.addToken(params);
                                DisclosuresAPI.setAid($stateParams.aid);
                                return DisclosuresAPI.Queries.listFacts(params).then(function(data){
                                    return data;
                                });
                            }]
                        }
                    }
                }
            });
    });
