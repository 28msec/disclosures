'use strict';

angular.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures', {
        url: '/disclosures/:cat?fiscalYear&fiscalPeriod&cik&tag&sic',
        templateUrl: 'disclosures/disclosures.html',
        controller: 'DisclosuresCtrl',
        resolve: {
            report: ['DisclosuresAPI', function(DisclosuresAPI){
                return DisclosuresAPI.getReport().then(function(report){ return report[0]; });
            }]
        }
    });
});
