'use strict';

angular
.module('disclosures')
.controller('FilterCtrl', function($scope, DisclosureAPI){
    $scope.filter = DisclosureAPI.filter;
})
;