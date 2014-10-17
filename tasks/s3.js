'use strict';

var _ = require('lodash');
var Q = require('q')
var AWS = require('aws-sdk');
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

var Config = require('./config');

var s3, key, secret, region, bucketName, config, publisher;

var init = function() {
    key = Config.isOnProduction ?  Config.credentials.s3.prod.key : Config.credentials.s3.dev.key;
    secret = Config.isOnProduction ?  Config.credentials.s3.prod.secret : Config.credentials.s3.dev.secret;
    region = Config.credentials.s3.region;
    bucketName = Config.isOnTravisAndMaster ? 'secdisclosures' : 'secdisclosures-' + Math.floor((Math.random() * 1000000) + 1);
    config = {
        accessKeyId: key,
        secretAccessKey: secret,
        region: region,
        bucket: bucketName
    };
    publisher = awspublish.create({
        key: key,
        secret: secret,
        bucket: bucketName
    });
    s3 = new AWS.S3(config);
};

// Will list *all* the content of the bucket given in options
// Recursively requests the bucket with a marker if there's more than
// 1000 objects. Ensures uniqueness of keys in the returned list.
var listObjects = function (idempotent, prefix, marker, contents) {
    var defered = Q.defer();

    var search = {
        Prefix: prefix,
        Bucket: bucketName
    };

    if (marker) {
        search.Marker = marker;
    }

    s3.listObjects(search, function (err, list) {
        if (!err) {
            var objects = (contents) ? contents.concat(list.Contents) : list.Contents;

            if (list.IsTruncated) {
                var new_marker = _.last(list.Contents).Key;
                listObjects(idempotent, prefix, new_marker, objects);
            } else {
                defered.resolve(_.uniq(objects, function (o) { return o.Key; }));
            }
        } else {
            if(idempotent) {
                defered.resolve();
            } else {
                defered.reject(new Error('Failed to list content of bucket ' + bucketName + '\n' + err));
            }
        }
    });
    return defered.promise;
};

var createBucket = function() {
    var defered = Q.defer();
    s3.createBucket({
        Bucket : bucketName,
        ACL : 'public-read'
    }, function(err, data) {
        if (err || data === null) {
            console.error(bucketName + err);
            defered.reject();
        } else {
            console.log(bucketName + ': bucket created');
            defered.resolve();
        }
    });
    return defered.promise;
};

var deleteBucket = function(idempotent) {
    return listObjects(idempotent)
        .then(function(list){
            console.log('list');
            console.log(list);
        })
        .fin(function(){
            var defered = Q.defer();
            s3.deleteBucket({
                Bucket : bucketName
            }, function(err, data) {
                if ((err || data === null) && !idempotent) {
                    console.error(bucketName + err);
                    defered.reject();
                } else {
                    console.log(bucketName + ': bucket deleted');
                    defered.resolve();
                }
            });
            return defered.promise;
        });
};

gulp.task('s3-setup', function(done) {
    var idempotent = true;
    init();
    if(!Config.isOnProduction) {
        deleteBucket(idempotent)
        .then(createBucket).then(function(){
            console.log('upload');
            //publisher
            done();
        })
        .catch(function(error){
            console.error(error);
        });
    } else {
        done();
    }
});

gulp.task('s3-teardown', function(done) {
    if(!Config.isOnProduction) {

    }
    done();
});

/*
 {
 "s3": {
 "dev": {
 "key": "AKIAJYKIEJORBXFKMA2Q",
 "secret": "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"
 },
 "prod": {
 "key": "AKIAJQDKG6VXEV2AI3ZA",
 "secret": "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"
 },
 "region": "us-east-1",
 "website": {
 "ErrorDocument": {
 "Key": "index.html"
 },
 "IndexDocument": {
 "Suffix": "index.html"
 },
 "RoutingRules": [{
 "Redirect": {
 "ReplaceKeyPrefixWith": "#"
 },
 "Condition": {
 "HttpErrorCodeReturnedEquals": "403"
 }
 }]
 }
 }
 }
 */