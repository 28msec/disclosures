'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var artworks = [
    'cp artwork/Icon-60.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-76.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-Small-40.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-Small.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/iTunesArtwork@2x.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-60@2x.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-76@2x.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-Small-40@2x.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/Icon-Small@2x.png platforms/ios/disclosures/Resources/icons/',
    'cp artwork/iTunesArtwork.png platforms/ios/disclosures/Resources/icons/',


    'mv platforms/ios/disclosures/Resources/icons/Icon-60.png platforms/ios/disclosures/Resources/icons/icon-60.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-76.png platforms/ios/disclosures/Resources/icons/icon-76.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-Small-40.png platforms/ios/disclosures/Resources/icons/icon-small-40.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-Small.png platforms/ios/disclosures/Resources/icons/icon-small.png',
    //'mv platforms/ios/disclosures/Resources/icons/iTunesArtwork@2x.png platforms/ios/disclosures/Resources/icons/',
    //'mv platforms/ios/disclosures/Resources/icons/iTunesArtwork.png platforms/ios/disclosures/Resources/icons/'
    'mv platforms/ios/disclosures/Resources/icons/Icon-60@2x.png platforms/ios/disclosures/Resources/icons/icon-60@2x.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-76@2x.png platforms/ios/disclosures/Resources/icons/icon-76@2x.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-Small-40@2x.png platforms/ios/disclosures/Resources/icons/icon-small-40@2x.png',
    'mv platforms/ios/disclosures/Resources/icons/Icon-Small@2x.png platforms/ios/disclosures/Resources/icons/icon-small@2x.png'
].join(' && ');

gulp.task('clean-platforms', $.shell.task('rm -rf platforms'));
gulp.task('add-build-ios', $.shell.task('ionic platform add ios'));
gulp.task('build-ios', $.shell.task('ionic build ios'));
gulp.task('artwork', $.shell.task('rm platforms/ios/disclosures/Resources/icons/* && ' + artworks));

gulp.task('ios', function(done){
    $.runSequence('clean-platforms', 'add-build-ios', 'artwork', 'build-ios', done);
});