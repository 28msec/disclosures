'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

var Config = require('./tasks/config');

gulp.task('s3-setup', function(done){
    done();
});

gulp.task('s3-teardown', function(done){
    done();
});
