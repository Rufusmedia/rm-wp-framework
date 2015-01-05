// Gulp tasks

// Load plugins
var gulp = require('gulp'),
gutil = require('gulp-util'),
watch = require('gulp-watch'),
size = require('gulp-size'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'),
minifyCSS = require('gulp-minify-css'),
sass = require('gulp-sass');


// Minify all css files in the css directory
// Run this in the root directory of the project with `gulp minify-css `
gulp.task('minify-css', function(){
  gulp.src('./style.css')
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(size({gzip:true, showFiles: true}))
  .pipe(gulp.dest('./'));
});

gulp.task('minify-img', function(){
  gulp.src('./assets/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
  }))
  .pipe(gulp.dest('./assets/'));
});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./sass/style.scss')
  .pipe(watch(function(files) {
    return files.pipe(sass({errLogToConsole: true}))
    //.pipe(size({gzip: false, showFiles: true}))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('./'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    //.pipe(size({gzip: false, showFiles: true}))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('./'))
  }));
});

/*
DEFAULT TASK
*/
gulp.task('default', ['pre-process'], function(){
  gulp.start('pre-process', 'minify-img');
  gulp.watch('sass/*.scss', ['pre-process']);
});
