var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));

var assetsPath = path.resolve(pkg.path.assets);
var distPath = path.resolve(pkg.path.dist);

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('watch', function() {
  gulp.watch(path.join(assetsPath, 'js/**/*.js'),['js']);
  gulp.watch(path.join(assetsPath, 'css/**/*.scss'),['sass']);
  gulp.watch('./html/**/*.html', ['static']);
  gulp.watch(path.join(assetsPath, 'images/*.*'), ['images']);
});

gulp.task('js', function() {
  browserify({
    entries: ['assets/js/application.js']
  })
  .bundle()
  .on('error', function() {
    notify.onError({
      title:   'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, arguments);

    this.emit('end');
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest(path.join(distPath, 'js')));
});

gulp.task('sass', function() {
    return gulp.src(path.join(assetsPath, 'css/**/*.scss'))
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(path.join(distPath, 'css')));
});

gulp.task('static', function() {
  return gulp.src('./html/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src(path.join(assetsPath, 'images/*.*'))
    .pipe(gulp.dest(path.join(distPath, 'images')));
});

gulp.task('build', [
  'js', 'sass', 'static', 'images'
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
  runSequence(
    'build',
    ['watch', 'server'],
    callback
  );
});
