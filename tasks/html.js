'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Config = require('./config');

gulp.task('sass', function() {
    return gulp.src('./scss/ionic.app.scss')
        .pipe($.sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));
});