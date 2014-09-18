'use strict';

angular
.module('disclosures.api', ['queries', 'session', 'reports'])
.factory('DisclosuresAPI', function(QueriesAPI, SessionAPI, ReportsAPI){
    var TOKEN = '7bfbf24d-3da5-46d3-b129-bbf9a365549e';
    var API_URL = 'https://secxbrl.28.io/v1';
    return {
        //Use caching: https://github.com/28msec/portal.28.io/blob/master/app/scripts/modules/api.28.io.js
        Queries: new QueriesAPI(API_URL + '/_queries/public/api'),
        Session: new SessionAPI(API_URL + '/_queries/public'),
        Reports: new ReportsAPI(API_URL + '/_queries/public/reports'),
        getToken: function(){
            return TOKEN;
        },
        getReport: function(){
            return this.Reports.listReports({
                _id: 'Disclosures',
                token: TOKEN
            });
        }
    };
})
;