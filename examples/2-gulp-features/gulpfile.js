const gulp = require('gulp');
const path = require('path');

gulp.task('default', ['build']);

gulp.task('build:js', function () {
    return gulp.src([path.join('src', 'index.js')])
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function () {
    return gulp.src([path.join('src', 'index.html')])
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
    return gulp.src([path.join('src', 'index.css')])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
    runSequence(
        ['build:html', 'build:js', 'build:css']
        ,callback)
});
