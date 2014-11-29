'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');

var Config = require('./config');

gulp.task('sass', function() {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass({ loadPath: '.' }))
        .pipe(gulp.dest('./www/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('html', ['sass'], function () {
    var assets = $.useref.assets({ searchPath: '{' + Config.paths.app + ',' + Config.paths.tmp + '}' });
    return gulp.src(Config.paths.index)
        .pipe(assets)
        //.pipe($.sourcemaps.init())
        //See comment blocks at index.html
        .pipe($.if('**/scripts.js', $.ngAnnotate()))
        .pipe($.if('**/scripts.js', $.uglify()))
        .pipe($.if(Config.paths.css, $.csso()))
        //.pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, { pkg: pkg })))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.if('*.html', $.minifyHtml({
            empty: true
        })))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest(Config.paths.dist))
        .pipe($.size({
            title: 'html'
        }));
});