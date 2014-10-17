'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var bower = require('bower');
var sh = require('shelljs');

var Config = require('./tasks/config');

require('./tasks/lint');
require('./tasks/html');
require('./tasks/images');
require('./tasks/fonts');
require('./tasks/swagger');
require('./tasks/s3');

gulp.task('env-check', function(done){
    if(process.env.TRAVIS_SECRET_KEY === undefined) {
        console.error('environment variable TRAVIS_SECRET_KEY is not set.');
        process.exit(1);
    }
    done();
});

gulp.task('encrypt', ['env-check'], $.shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json -out credentials.json.enc'));
gulp.task('decrypt', ['env-check'], $.shell.task('openssl aes-256-cbc -k $TRAVIS_SECRET_KEY -in credentials.json.enc -out credentials.json -d'));

gulp.task('load-config', ['decrypt'], function(done){
    var fs = require('fs');
    Config.credentials = JSON.parse(fs.readFileSync(Config.paths.credentials, 'utf-8'));
    done();
});

gulp.task('setup', ['load-config'], function(){
    gulp.start('s3-setup');
});

gulp.task('watch', function() {
    return gulp.watch(Config.paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
          $.gutil.log('bower', $.gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + $.gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', $.gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + $.gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], function () {
    return gulp.src(Config.paths.dist).pipe($.size({title: 'build', gzip: true}));
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('default', ['decrypt', 'swagger', 'lint', 'sass']);

