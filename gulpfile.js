var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");



var ghpages = require('gh-pages');
var path = require('path');

gulp.task('sass', function(){
  return gulp.src('src/scss/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("assets", function () {
  return gulp.src("src/assets/*.js")
    .pipe(gulp.dest("dist/assets"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist/"));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})



gulp.task('default', ['browserSync', 'sass', 'assets'], function(){
  gulp.watch('src/scss/*.+(scss|sass)', ['sass']);
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('src/*.html', ['html', browserSync.reload]);
  gulp.watch('src/**/*.js', ['js', browserSync.reload]);
  // Other watchers
})

gulp.task('publish', function(){
  ghpages.publish('dist', function(err){console.log(err)})
})

