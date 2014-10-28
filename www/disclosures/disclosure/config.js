'use strict';

angular
    .module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.start.filter.disclosure', {
                url: '/:fiscalYear/:fiscalPeriod/:tag',
                templateUrl: 'disclosures/disclosure/disclosure.html',
                controller: 'DisclosureCtrl',
                resolve: {
                    disclosures: ['_', 'DisclosuresAPI', '$stateParams', function(_ , DisclosuresAPI, $stateParams){
                        return DisclosuresAPI.getReport().then(function(report){
                            var params = {
                                onlyNames: true,
                                contentType: 'application/x-www-form-urlencoded',
                                report: 'Disclosures'
                            };
                            DisclosuresAPI.addToken(params).addFilter(params, $stateParams);
                            return DisclosuresAPI.Queries.listReportElements(params).then(function(data){
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
