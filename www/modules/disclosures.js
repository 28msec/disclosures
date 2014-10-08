'use strict';

angular
.module('disclosures.api', ['queries', 'session', 'reports'])
.factory('DisclosuresAPI', function(QueriesAPI, SessionAPI, ReportsAPI){
    var TOKEN = 'becd3d60-d470-446e-8b5a-b6d6e4391331';
    var API_URL = 'http://secxbrl.28.io/v1';
    return {
        //Use caching: https://github.com/28msec/portal.28.io/blob/master/app/scripts/modules/api.28.io.js
        Queries: new QueriesAPI(API_URL + '/_queries/public/api'),
        Session: new SessionAPI(API_URL + '/_queries/public'),
        Reports: new ReportsAPI(API_URL + '/_queries/public/reports'),

        filter:
        {
            cik: [],
            fiscalPeriod: ['FY'],
            fiscalYear: [2014],
            tag: ['DOW30']
        },
        
        aid : null,

        getToken: function(){
            return TOKEN;
        },

        getReport: function(){
            return this.Reports.listReports({
                _id: 'Disclosures',
                token: TOKEN
            }).then(function(reports){
                return reports[0];
            });
        },

        addToken: function(params) {
            params.token = TOKEN;
            return this;
        },
        
        setAid : function(aid) {
            this.aid = aid;
        },

        addFilter: function(params){

            var that = this;
            Object.keys(this.filter).forEach(function(param){
                params[param] = that.filter[param];
            });
            return this;
        }
    };
})
;