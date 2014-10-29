'use strict';

angular
    .module('disclosures')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('disclosures.start', {
                url: '/index',
                views : {
                    'main@disclosures' : {
                        templateUrl: 'disclosures/startpage/startpage.html',
                        controller: 'StartpageCtrl',
                        resolve: {
                        }
                    }
                }
            });
    }])
;
