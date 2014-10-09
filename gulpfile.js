'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
//var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var fs = require('fs');

var paths = {
  json: ['package.json'],
  js: ['gulpfile.js', 'www/**/*.js', '!www/lib/**/*.js'],
  sass: ['./scss/**/*.scss']
};

gulp.task('jslint', function(){
    var jshint = require('gulp-jshint');

    return gulp.src(paths.js.concat(['!www/modules/*-api.js']))
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('jsonlint', function(){
    var jsonlint = require('gulp-jsonlint');

    return gulp.src(paths.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('lint', ['jslint', 'jsonlint']);

gulp.task('default', ['swagger', 'lint', 'sass']);

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
    return gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('swagger', function(done){
    var request = require('request');
    var Q = require('q');
    var CodeGen = require('swagger-js-codegen').CodeGen;
    var apis = [
        {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/queries.json',
            moduleName: 'queries',
            className: 'QueriesAPI'
        }, {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/session.json',
            moduleName: 'session',
            className: 'SessionAPI'
        }, {
            swagger: 'https://raw.githubusercontent.com/28msec/secxbrl.info/master/swagger/reports.json',
            moduleName: 'reports',
            className: 'ReportsAPI'
        }
    ];
    var dest = 'www/modules';
    var promises = [];
    apis.forEach(function(api){
        var deferred = Q.defer();
        request({
            uri: api.swagger,
            method: 'GET'
        }, function(error, response, body){
            var swagger = JSON.parse(body);
            var source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
            console.log('Generated ' + api.moduleName + '-api.js from ' + api.swagger);
            fs.writeFileSync(dest + '/' + api.moduleName + '-api.js', source, 'UTF-8');
            deferred.resolve();
        });
        promises.push(deferred.promise);
    });
    Q.all(promises).then(function(){
        done();
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
