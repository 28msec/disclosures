'use strict';

angular.module('disclosures')
.controller('DisclosuresCtrl', function($scope, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});