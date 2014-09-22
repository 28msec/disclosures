'use strict';

angular.module('disclosures')
.controller('DisclosuresCtrl', function($scope, $stateParams, $ionicSideMenuDelegate, disclosures) {
    var report = disclosures.report;
    var reportElements = disclosures.reportElements;


    $scope.leftButtons = [{
        type: 'button-icon button-clear ion-navicon',
        tap: function() {
            $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
        }
    }];

    $scope.category = $stateParams.category;

    $scope.used = {};
    $scope.policies = [];
    $scope.footnotes = [];
    $scope.disclosures = [];

    report.Networks.forEach(function(network) {
        if (network.LinkName === 'link:presentationLink')
        {
            var node = network.Trees['disc:DisclosuresLineItems'].To;
            _.forEach(node, function(hierarchy, name){
                var container;
                if(name === 'disc:FootnotesHierarchy') {
                    container = $scope.footnotes;
                } else if(name === 'disc:PoliciesHierarchy') {
                    container = $scope.policies;
                } else if(name === 'disc:DisclosuresHierarchy') {
                    container = $scope.disclosures;
                }
                _.forEach(hierarchy.To, function(concept){
                    if(reportElements.indexOf(concept.Name) !== -1) {
                        $scope.used[concept.Name] = true;
                    }
                    container.push(concept);
                });
            });
        }
    });

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
