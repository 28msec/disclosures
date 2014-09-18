'use strict';

angular.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures', {
        url: '/disclosures/:category?fiscalYear&fiscalPeriod&cik&tag&sic',
        templateUrl: 'disclosures/disclosures.html',
        controller: 'DisclosuresCtrl',
        resolve: {
            disclosures: ['DisclosuresAPI', function(DisclosuresAPI){
                return DisclosuresAPI.getReport().then(function(report){
                    report = report[0];
                    var params = {
                        onlyNames: true
                    };
                    DisclosuresAPI.addToken(params).addFilter(params);
                    //TODO: use name parameter for better performance
                    return DisclosuresAPI.Queries.listReportElements(params).then(function(data){
                        console.log(data);
                        return {
                            report: report,
                            reportElements: data.ReportElements
                        };
                    });
                });
            }]
        }
    });
});
