let gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin');

gulp.task('stylus', function () {
  return gulp
    .src('app/stylus/*.styl')
    .pipe(stylus({ compress: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
      }),
    )
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('style', function () {
  return gulp
    .src(['node_modules/normalize.css/normalize.css', 'node_modules/izimodal/css/iziModal.min.css'])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'));
});

gulp.task('script', function () {
  return gulp
    .src(['node_modules/izimodal/js/iziModal.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('html', function () {
  return gulp.src('app/*.html').pipe(browserSync.reload({ stream: true }));
});

gulp.task('pug', function () {
  return gulp
    .src('app/pages/**/*.pug')
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
  return gulp.src('app/scripts/*.js').pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.styl', gulp.parallel('stylus'));
  gulp.watch('app/**/*.html', gulp.parallel('html'));
  gulp.watch('app/**/*.pug', gulp.parallel('pug'));
  gulp.watch('app/**/*.js', gulp.parallel('js'));
});

gulp.task(
  'default',
  gulp.parallel('stylus', 'style', 'script', 'html', 'pug', 'js', 'watch', 'browser-sync'),
);
