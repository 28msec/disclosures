'use strict';

angular
.module('disclosures.api', ['queries', 'session', 'reports'])
.factory('DisclosuresAPI', function(Filter, QueriesAPI, SessionAPI, ReportsAPI){

    var TOKEN = 'becd3d60-d470-446e-8b5a-b6d6e4391331';
    var API_URL = 'https://secxbrl.28.io/v1';

    var Queries = new QueriesAPI(API_URL + '/_queries/public/api');
    var Session = new SessionAPI(API_URL + '/_queries/public');
    var Reports = new ReportsAPI(API_URL + '/_queries/public/reports');

    function DisclosuresAPI(){

    }

    DisclosuresAPI.prototype.getFilterParameters = function(){
        return Reports.getParameters({$method: 'POST'});
    };

    DisclosuresAPI.prototype.getToken = function(){
        return TOKEN;
    };

    DisclosuresAPI.prototype.getReport = function(){
        return Reports.listReports({
            _id: 'Disclosures',
            token: TOKEN
        }).then(function(reports){
            return reports[0];
        });
    };

    DisclosuresAPI.prototype.addToken = function(params) {
        params.token = TOKEN;
        return this;
    };

    DisclosuresAPI.prototype.addFilter = function(params){
        var that = this;
        Object.keys(this.filter).forEach(function(param){
            params[param] = that.filter[param];
        });
        return this;
    };
 
    return new DisclosuresAPI();
})
;
