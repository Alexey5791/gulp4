const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
 
sass.compiler = require('node-sass');
 
gulp.task('styles', function () {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify({
      toplevel: 2
    }))
    .pipe(gulp.dest('./dist/js'));
});