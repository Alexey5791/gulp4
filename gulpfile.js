const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
// const oldUglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const imageMin = require('gulp-imagemin');
// const concat = require('gulp-concat');
const purgecss = require('gulp-purgecss')
 
sass.compiler = require('node-sass');

function clear(){
  return del(['dist/*']);
}


function fonts(){
  return gulp.src('./src/fonts/**/*{ttf,woff,woff2,svg,eot}')
  .pipe(gulp.dest('./dist/fonts'))
}

function images(){
  return gulp.src('src/img/**/*')
            .pipe(imageMin())
            .pipe(gulp.dest('./dist/img'));
}


function styles(){
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(
      purgecss({
        content: ['index.html']
      })
    )
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function scripts(){
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
  gulp.watch('./src/sass/**/*.sass', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clear,
                    gulp.parallel(styles, fonts, images, scripts)
));