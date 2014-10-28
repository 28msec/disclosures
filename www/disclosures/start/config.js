'use strict';

angular
    .module('disclosures')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('disclosures.start', {
                url: '/index',
                templateUrl: 'disclosures/start/start.html',
                controller: 'StartCtrl',
                resolve: {
                }
            });
    }])
;
