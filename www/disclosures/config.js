'use strict';

angular.module('disclosures')
.config([ '$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('disclosures', {
        url: '/disclosures?fiscalYear&fiscalPeriod&cik&tag&sic',
        templateUrl: 'disclosures/disclosures.html',
        controller: 'DisclosuresCtrl',
        abstract: true
    });
}]);
