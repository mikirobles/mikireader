var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var assets = "www/assets"
var www = "www/"

var ghpages = require('gh-pages');
var path = require('path');

gulp.task('sass', function(){
  return gulp.src(www + '/scss/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(www + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'www'
    },
  })
})



gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch(www + '/scss/*.+(scss|sass)', ['sass']);
  gulp.watch(www + '/css/*.css', browserSync.reload);
  gulp.watch('www/*.html', browserSync.reload);
  gulp.watch(assets + '/js/*.js', browserSync.reload);
  // Other watchers
})

gulp.task('publish', function(){
  ghpages.publish('www', function(err){console.log(err)})
})

