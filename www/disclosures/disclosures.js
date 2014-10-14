'use strict';
angular.module('disclosures')
    .controller('DisclosuresCtrl', function(_, $scope, $stateParams, $state, $ionicSideMenuDelegate, DisclosuresAPI) {

        $scope.nav = {};

        $scope.filterChange = function() {
          $scope.nav.fiscalYear = DisclosuresAPI.filter.fiscalYear;
          $scope.nav.fiscalPeriod = DisclosuresAPI.filter.fiscalPeriod;
          $scope.nav.tag = DisclosuresAPI.filter.tag;
        };

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.leftButtons = [
            {
                type: 'button-icon button-clear ion-navicon',
                tap: function () {
                    $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
                }
            }
        ];

    })
;
