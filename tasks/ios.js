'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('clean-platforms', $.shell.task('rm -rf platforms'));
gulp.task('add-build-ios', $.shell.task('ionic platform add ios'));
gulp.task('build-ios', $.shell.task('ionic build ios'));
gulp.task('icons', $.shell.task('rm platforms/ios/disclosures/Resources/icons/* && cp artwork/icons/*.png platforms/ios/disclosures/Resources/icons/'));
gulp.task('splash', $.shell.task('rm platforms/ios/disclosures/Resources/splash/* && cp artwork/splash/*.png platforms/ios/disclosures/Resources/splash/'));

gulp.task('ios', function(done){
    $.runSequence('clean-platforms', 'add-build-ios', 'icons', 'splash', 'build-ios', done);
});