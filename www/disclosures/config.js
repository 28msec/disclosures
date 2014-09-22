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
                    report = report[0];
                    var params = {
                        onlyNames: true,
                        contentType: 'application/x-www-form-urlencoded'
                    };
                    var names = [];
                    report.Networks.forEach(function(network) {
                        if (network.LinkName === 'link:presentationLink')
                        {
                            var node = network.Trees['disc:DisclosuresLineItems'].To;
                            _.forEach(node, function(hierarchy){
                                _.forEach(hierarchy.To, function(concept){
                                    names.push('name=' + encodeURIComponent(concept.Name));
                                });
                            });
                        }
                    });

                    DisclosuresAPI.addToken(params).addFilter(params);
                    params.name = names.join('&');
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

        $stateProvider.state('disclosures.filter', {
            url: '/filter',
            templateUrl: 'disclosures/filter/filter.html',
            controller: 'FilterCtrl'
        });
});
