const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const del = require('del');
// const concat = require('gulp-concat');
 
sass.compiler = require('node-sass');

function clear(){
  return del(['dist/*']);
}

function styles(){
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
}

function scripts(){
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify({
      toplevel: 2
    }))
    .pipe(gulp.dest('./dist/js'));
}

function watch(){
  gulp.watch('./src/sass/**/*.sass', styles);
  gulp.watch('./src/js/**/*.js', scripts);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clear,
                    gulp.parallel(styles, scripts)
));