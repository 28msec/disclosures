'use strict';

angular
.module('disclosures')
.config(function ($stateProvider) {
    $stateProvider
    .state('disclosures.list', {
        url: '/:list',
        templateUrl: 'disclosures/list/list.html',
        controller: 'DisclosuresListCtrl',
        resolve: {
            reportSchema: ['DisclosuresAPI', function(DisclosuresAPI){
                return DisclosuresAPI.getReport();
            }]
        }
    });
});
