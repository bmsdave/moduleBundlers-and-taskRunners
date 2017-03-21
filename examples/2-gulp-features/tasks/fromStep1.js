const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const path = require('path');
const runSequence = require('run-sequence');

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del(path.join('dist'));
});

gulp.task('build:js', function () {
    return gulp.src([
        './src/**/*.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function () {
    return gulp.src([path.join('src', 'index.html')])
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:less', function () {
    return gulp.src([path.join('src', 'index.less')])
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('watch', ['default', 'connect'], function (callback) {
    const jsWatcher = gulp.watch('src/**/*.js', ['build:js']);
    jsWatcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch('src/**/*.html', ['build:html']);
    gulp.watch('src/**/*.less', ['build:less']);

});
