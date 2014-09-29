'use strict';

window.onerror = function(message, url, line, col, error){
    var stopPropagation = false;
    var data = {
        type: 'javascript',
        url: window.location.hash,
        localtime: Date.now()
    };
    if(message)       { data.message      = message;      }
    if(url)           { data.fileName     = url;          }
    if(line)          { data.lineNumber   = line;         }
    if(col)           { data.columnNumber = col;          }
    if(error){
        if(error.name)  { data.name         = error.name;   }
        if(error.stack) { data.stack        = error.stack;  }
    }

    console.error(data);
    return stopPropagation;
};

angular.module('disclosures', ['ionic', 'disclosures.api'])
.run(function($ionicPlatform) {
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
.config(function($provide, $stateProvider, $urlRouterProvider) {

        $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
            return function(exception, cause){
                $delegate(exception, cause);

                var data = {
                    type: 'angular',
                    url: window.location.hash,
                    localtime: Date.now()
                };
                if(cause)               { data.cause    = cause;              }
                if(exception){
                    if(exception.message) { data.message  = exception.message;  }
                    if(exception.name)    { data.name     = exception.name;     }
                    if(exception.stack)   { data.stack    = exception.stack;    }
                }

                console.error(data);
            };
        }]);

    $urlRouterProvider.otherwise('/disclosures/filter');
});
