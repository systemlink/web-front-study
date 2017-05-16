var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var assetsPath = path.resolve(pkg.path.assetsDir);

var gulp = require('gulp');

var concat = require('gulp-concat');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');

gulp.task('sass', function() {
    gulp.src(path.join(assetsPath, 'css/**/*.scss'))
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(path.join(assetsPath, 'css/dist/')));
});

gulp.task('default', function() {
    gulp.watch(path.join(assetsPath, 'css/**/*.scss'),['sass']);
});
