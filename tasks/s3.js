'use strict';

var _ = require('lodash');
var Q = require('q');
var AWS = require('aws-sdk');
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var parallelize = require("concurrent-transform");

var Config = require('./config');

//var headers = {};

var s3, key, secret, region, bucketName, config, publisher;

var init = function() {
    key = Config.isOnProduction ?  Config.credentials.s3.prod.key : Config.credentials.s3.dev.key;
    secret = Config.isOnProduction ?  Config.credentials.s3.prod.secret : Config.credentials.s3.dev.secret;
    region = Config.credentials.s3.region;
    bucketName = Config.isOnTravisAndMaster ? 'secdisclosures' : 'secdisclosures-' + process.env.RANDOM_ID;
    console.log('Bucket Name' + bucketName);
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

var makeBucketWebsite = function() {
    console.log('Set website configuration');
    var defered = Q.defer();
    s3.putBucketWebsite(
        {
            Bucket : bucketName,
            WebsiteConfiguration : Config.credentials.s3.website
        }, function(err) {
            if (err) {
                console.log(bucketName + ': could not configure for website hosting ' + err);
                defered.reject();
            }
            else {
                console.log(bucketName + ': configured for website hosting');
                console.log('Website available at http://' + bucketName + '.s3-website-' + region + '.amazonaws.com/');
                defered.resolve();
            }
        }
    );
    return defered.promise;
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
            console.log('Deleting objects');
            console.log(list);
            var deleteList = [];
            list.forEach(function(object){
                deleteList.push({
                    Key: object.Key,
                    VersionId: object.VersionId
                });
            });
            var defered = Q.defer();
            s3.deleteObjects({
                Bucket: bucketName,
                Delete: {
                    Objects: deleteList
                }
            }, function(err, data){
                if (err || data === null) {
                    console.error(bucketName + err);
                    defered.reject();
                } else {
                    console.log(bucketName + ': bucket deleted');
                    defered.resolve();
                }
            });
            return defered.promise;
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
        return deleteBucket(idempotent)
        .then(createBucket)
        .then(makeBucketWebsite)
        .then(function(){
            console.log('Upload to ');
            return gulp.src('dist/**/*')
                    .pipe(awspublish.gzip())
                    .pipe(parallelize(publisher.publish(), 10))
                    .pipe(publisher.cache())
                    .pipe(awspublish.reporter());
        })
        .catch(function(error){
            console.error('Error while doing the s3 setup');
            console.error(error);
        });
    } else {
        done();
    }
});

gulp.task('s3-teardown', function(done) {
    init();
    if(!Config.isOnProduction) {
        deleteBucket().then(function(){
            done();
        })
        .catch(function(error){
            console.error('Error while doing the s3 setup');
            console.error(error);
        });
    } else {
        done();
    }
});