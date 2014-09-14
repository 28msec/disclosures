'use strict';

angular.module('disclosures')
.config([ '$stateProvider', function ($stateProvider) {

    $stateProvider
    .state('disclosures.list', {
        url: '/:list',
        templateUrl: 'disclosures/list/list.html',
        controller: 'DisclosuresListCtrl',
        resolve: {
            reportSchema: function(){
                return {};
            }
            //reportSchema: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
            //    return {};
            //}]
        }
    });
}]);
