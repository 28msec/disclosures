'use strict';
angular.module('disclosures')
    .controller('DisclosuresCtrl',
      function(_, $scope, $stateParams, $state, $ionicSideMenuDelegate, DisclosuresAPI) {

        $scope.nav = {};
        $scope.isReverse = false;

        $scope.filterChange = function() {
          $scope.nav.fiscalYear = DisclosuresAPI.filter.fiscalYear;
          $scope.nav.fiscalPeriod = DisclosuresAPI.filter.fiscalPeriod;
          $scope.nav.tag = DisclosuresAPI.filter.tag;
        };

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.rev = function(isReverse) {
           $scope.isReverse = isReverse;
        };

        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
           document.getElementById("animcontainer").className = $scope.isReverse ? 'slide-right-left' : 'slide-left-right';
           $scope.isReverse = false;
        });

        $scope.rev(false);

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
