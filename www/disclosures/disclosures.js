'use strict';

angular.module('disclosures')
.controller('DisclosuresCtrl', function($scope, $stateParams, $ionicSideMenuDelegate, report) {

    var cat = $stateParams.cat;

    $scope.policies = [];
    $scope.footnotes = [];
    $scope.disclosures = [];
    $scope.all = [];

    $scope.concepts = [];
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
                    container.push(concept);
                });
            });
            $scope.all = _.reduce([$scope.policies, $scope.footnotes, $scope.disclosures], function(a, b){
                return a.concat(b);
            });
        }
    });

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
