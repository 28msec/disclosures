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

gulp.task('html', ['sass'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,www}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.assets().restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});