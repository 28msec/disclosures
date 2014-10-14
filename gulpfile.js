'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var fs = require('fs');
var map = require('map-stream');
var shell = require('gulp-shell');

var paths = {
  json: ['*.json'],
  js: ['gulpfile.js', 'www/**/*.js', '!www/lib/**/*.js'],
  sass: ['./scss/**/*.scss'],
  config: 'config.json'
};

gulp.task('env-check', function(done){
    if(process.env.TRAVIS_SECRET_KEY === undefined) {
        console.error('environment variable TRAVIS_SECRET_KEY is not set.');
        process.exit(1);
    }
    done();
});

gulp.task('encrypt', ['env-check'], shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in config.json -out config.json.enc'));
gulp.task('decrypt', ['env-check'], shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in config.json.enc -out config.json -d'));

gulp.task('jslint', function(){
    var jshint = require('gulp-jshint');

    return gulp.src(paths.js.concat(['!www/modules/*-api.js']))
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(jshint.reporter('fail'));
});

gulp.task('jsonlint', function(){
    var jsonlint = require('gulp-jsonlint');

    return gulp.src(paths.json)
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
            if(error || response.statusCode !== 200) {
                deferred.reject('Error while fetching ' + api.swagger + ': ' + (error || body));
            } else {
                var swagger = JSON.parse(body);
                var source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
                console.log('Generated ' + api.moduleName + '-api.js from ' + api.swagger);
                fs.writeFileSync(dest + '/' + api.moduleName + '-api.js', source, 'UTF-8');
                deferred.resolve();
            }
        });
        promises.push(deferred.promise);
    });
    Q.all(promises).then(function(){
        done();
    }).catch(function(error){
        console.error(error);
        process.exit(1);
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
