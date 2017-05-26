var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var assetsPath = path.resolve(pkg.path.assetsDir);

var gulp = require('gulp');

var concat = require('gulp-concat');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');

var notify  = require('gulp-notify');

var webserver = require('gulp-webserver');

var runSequence = require('run-sequence');

gulp.task('watch', function() {
  gulp.watch(path.join(assetsPath, 'css/**/*.scss'),['sass']);
  gulp.watch('./html/**/*.html', ['static']);
  gulp.watch(path.join(assetsPath, 'images/*.*'), ['images']);
});

gulp.task('sass', function() {
    return gulp.src(path.join(assetsPath, 'css/**/*.scss'))
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(concat('main.css'))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('static', function() {
  return gulp.src('./html/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src(path.join(assetsPath, 'images/*.*'))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', [
  'sass', 'static', 'images'
]);

gulp.task('server', function() {
  return gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      fallback: 'top.html'
    }))
})

gulp.task('default', function(callback) {
  runSequence('build', 'watch', 'server', callback);
});
