'use strict';

angular
.module('disclosures')
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('disclosures.start.filter', {
            url: '/filter',
            views : {
                'main@disclosures' : {
                    templateUrl: 'disclosures/filter/filter.html',
                    controller: 'FilterCtrl',
                    resolve: {
                        filterParameters: ['DisclosuresAPI', function(DisclosuresAPI) {
                            return DisclosuresAPI.Reports.getParameters({});
                        }]
                    }
                }
            }
        });
}])
;
