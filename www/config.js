'use strict';

angular.module('disclosures', ['lodash', 'ionic', 'disclosures.api'])
.run(function($rootScope, $ionicPlatform) {
	    
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
	 console.error(error);	      
  });
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/disclosures/filter');
})
;
