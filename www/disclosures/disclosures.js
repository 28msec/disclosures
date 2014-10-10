'use strict';

angular.module('disclosures')
.controller('DisclosuresCtrl', function($scope, $stateParams, $state, $ionicSideMenuDelegate, disclosures, DisclosuresAPI) {
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

    $scope.report = report;
    $scope.names = disclosures.names
    ;
    $scope.updateAvailableConcepts = function(reportElements) {
    	$scope.used = {};
        _.forEach(reportElements, function(elem) { $scope.used[elem] = true; });	
    };
    
    $scope.filterChange = function() {
      $scope.updateAvailableConcepts([]);
      var params = {
         onlyNames: true,
         contentType: 'application/x-www-form-urlencoded',
          report: 'Disclosures'
      };
      DisclosuresAPI.addToken(params).addFilter(params);
      params.name = $scope.names.join('&');
      DisclosuresAPI.Queries.listReportElements(params).then(function(data){
           $scope.updateAvailableConcepts(data.ReportElements);              
      });	
    };
    
    
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
        }
    });
    
    $scope.updateAvailableConcepts(reportElements);
    
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    
    $scope.select = function(params) {
       /*if (DisclosuresAPI.aid) $state.go('disclosures.fact', { "aid" : DisclosuresAPI.aid, "concept": params.concept }, null);
       else */ 
       $state.go('disclosures.concept', params, null);
    };
    
    $scope.up = function() {       
       if (DisclosuresAPI.aid) {
    	   $state.go('disclosures.concept', { concept : $state.params.concept });
       }
       else 
       {
    	  $state.go('disclosures.filter');
       }    	   
    };
});
