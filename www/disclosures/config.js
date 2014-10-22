'use strict';
angular.module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures', {
                url: '/disclosures',//?fiscalYear&fiscalPeriod&cik&tag&sic
                templateUrl: 'disclosures/disclosures.html',
                controller: 'DisclosuresCtrl',
                abstract: true,
                resolve: { }
            })
        ;
    });