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

gulp.task('lint', function(){
    var jsonlint = require('gulp-jsonlint');
    var jshint = require('gulp-jshint');

    gulp.src(paths.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());

    gulp.src(paths.js.concat(['!www/modules/*-api.js']))
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('default', ['swagger', 'lint', 'sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('swagger', function(){
    var CodeGen = require('swagger-js-codegen').CodeGen;
    var apis = [
        {
            swagger: 'swagger/queries.json',
            moduleName: 'queries',
            className: 'QueriesAPI'
        }, {
            swagger: 'swagger/session.json',
            moduleName: 'session',
            className: 'SessionAPI'
        }
    ];
    var dest = 'www/modules';
    apis.forEach(function(api){
        var swagger = JSON.parse(fs.readFileSync(api.swagger));
        var source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
        console.log('Generated ' + api.moduleName + '-api.js from ' + api.swagger);
        fs.writeFileSync(dest + '/' + api.moduleName + '-api.js', source, 'UTF-8');
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
