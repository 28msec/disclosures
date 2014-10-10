'use strict';

angular.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures', {
        url: '/disclosures',//?fiscalYear&fiscalPeriod&cik&tag&sic
        templateUrl: 'disclosures/disclosures.html',
        controller: 'DisclosuresCtrl',
        abstract: true,
        resolve: {
            disclosures: ['DisclosuresAPI', function(DisclosuresAPI){
                return DisclosuresAPI.getReport().then(function(report){
                    var params = {
                        onlyNames: true,
                        contentType: 'application/x-www-form-urlencoded',
                        report: 'Disclosures'
                    };
                    DisclosuresAPI.addToken(params).addFilter(params);
                    return DisclosuresAPI.Queries.listReportElements(params).then(function(data){
                        return {
                            report: report,
                            reportElements: data.ReportElements
                        };
                    });
                });
            }]
        }
    })
    ;
});
