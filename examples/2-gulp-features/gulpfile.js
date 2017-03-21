const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const path = require('path');
const runSequence = require('run-sequence');

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del(path.join('dist'));
});

gulp.task('build:js', function () {
    return gulp.src([
        path.join('src', 'app', 'app.js'),
        path.join('src', 'index.js')
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function () {
    return gulp.src([path.join('src', 'index.html')])
        .pipe(gulp.dest('dist'));
});

gulp.task('build:less', function () {
    return gulp.src([path.join('src', 'index.less')])
        .pipe(less())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build:html', 'build:js', 'build:less'],
        callback
    )
});
