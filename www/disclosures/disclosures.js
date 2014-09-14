'use strict';

angular.module('disclosures')
.controller('DisclosuresCtrl', function($scope, $ionicSideMenuDelegate, report) {

    console.log(report);

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});