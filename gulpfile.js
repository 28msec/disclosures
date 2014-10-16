'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var map = require('map-stream');
var shell = require('gulp-shell');

var Config = require('./tasks/config');

require('./tasks/swagger');
require('./tasks/s3');

gulp.task('env-check', function(done){
    if(process.env.TRAVIS_SECRET_KEY === undefined) {
        console.error('environment variable TRAVIS_SECRET_KEY is not set.');
        process.exit(1);
    }
    done();
});

gulp.task('encrypt', ['env-check'], shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json -out credentials.json.enc'));
gulp.task('decrypt', ['env-check'], shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json.enc -out credentials.json -d'));

gulp.task('load-config', ['decrypt'], function(done){
    var fs = require('fs');
    Config.credentials = JSON.parse(fs.readFileSync(Config.paths.credentials, 'utf-8'));
    done();
});

gulp.task('jslint', function(){
    var jshint = require('gulp-jshint');
    return gulp.src(Config.paths.js.concat(['!www/modules/*-api.js']))
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(jshint.reporter('fail'));
});

gulp.task('jsonlint', function(){
    var jsonlint = require('gulp-jsonlint');

    return gulp.src(Config.paths.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter())
        .pipe(map(function(file, cb) {
            if (!file.jsonlint.success) {
                process.exit(1);
            }
            cb(null, file);
        }));
});

gulp.task('lint', ['jslint', 'jsonlint']);

gulp.task('default', ['decrypt', 'swagger', 'lint', 'sass']);
gulp.task('setup', ['load-config'], function(){
    gulp.start('s3-setup');
});

gulp.task('sass', function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('watch', function() {
    return gulp.watch(Config.paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
