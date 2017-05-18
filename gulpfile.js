var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var assetsPath = path.resolve(pkg.path.assetsDir);

var gulp = require('gulp');

var concat = require('gulp-concat');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');

var webserver = require('gulp-webserver');

var runSequence = require('run-sequence');

gulp.task('watch', function() {
  gulp.watch(path.join(assetsPath, 'css/**/*.scss'),['sass']);
  gulp.watch('./html/**/*.html', ['static']);
});

gulp.task('sass', function() {
    return gulp.src(path.join(assetsPath, 'css/**/*.scss'))
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('static', function() {
  return gulp.src('./html/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', [
  'sass', 'static'
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
