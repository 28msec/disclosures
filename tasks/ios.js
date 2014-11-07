'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('clean-platforms', $.shell.task('rm -rf platforms'));
gulp.task('add-build-ios', $.shell.task('ionic platform add ios'));
gulp.task('build-ios', $.shell.task('ionic build ios'));
gulp.task('artwork', $.shell.task('ls'));//'rm platforms/ios/disclosures/Resources/icons/* && cp artwork/*.png platforms/ios/disclosures/Resources/icons/'));

gulp.task('ios', function(done){
    $.runSequence('clean-platforms', 'add-build-ios', 'artwork', 'build-ios', done);
});