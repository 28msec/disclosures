'use strict';

angular
    .module('disclosures')
    .config(function ($stateProvider) {
        $stateProvider
            .state('disclosures.filter', {
                url: '/filter',
                templateUrl: 'disclosures/filter/filter.html',
                controller: 'FilterCtrl'
            });
    });