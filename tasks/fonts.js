'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Config = require('./config');

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});