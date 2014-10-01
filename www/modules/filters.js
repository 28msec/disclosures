'use strict';

angular
.module('filters', [])
.factory('Filters', function(){
	var filters =
    {
       entities: [],
       periods: [],
       years: [],
       tags: []
    };
	
	// More useful initialization ?
	filters.tags.push("DOW30");
	filters.periods.push("FY");
	filters.years.push(2014);
	
	return filters;
})
;
