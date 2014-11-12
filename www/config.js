'use strict';

angular.module('disclosures', ['lodash', 'ionic', 'disclosures.api'])
.run(function($rootScope, $ionicPlatform, $ionicLoading) {
	    
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
	 console.error(error);
     $ionicLoading.hide();
  });

  $rootScope.$on('$stateChangeStart', function() {
    $ionicLoading.show({
       template: 'Please Wait...',
       delay: 900
    });
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $ionicLoading.hide();
  });
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/disclosures/index');
}])
;
