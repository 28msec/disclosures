'use strict';

angular
.module('disclosures.api', ['queries', 'session', 'reports'])
.factory('DisclosuresAPI', function(QueriesAPI, SessionAPI, ReportsAPI){
    var TOKEN = 'db9392f2-1147-4ee1-8cea-58a11df884b0';
    var API_URL = 'https://secxbrl.28.io/v1';
    return {
        Queries: new QueriesAPI(API_URL + '/_queries/public/api'),
        Session: new SessionAPI(API_URL + '/_queries/public'),
        Reports: new ReportsAPI(API_URL + '/_queries/public/reports'),
        getReport: function(){
            return this.Reports.listReports({
                _id: 'Disclosures',
                token: TOKEN
            });
        }
    };
})
;