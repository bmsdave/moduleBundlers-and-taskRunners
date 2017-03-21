const gulp = require('gulp');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

require('./tasks/fromStep1');


const conf = {
    karma: path.join(__dirname, '/karma.conf.js')
};

/**
 * create task from file
 * @param task {string} name of task file without ".js"
 * @param beforeTask {Array} array of task runnen before this
 */
function createTask(task, beforeTask) {
    gulp.task(
        task,
        beforeTask || [],
        require('.//tasks/task_' + task)(gulp, plugins, conf)
    );
}


createTask('svg');
createTask('karma');

gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        [
            'build:html',
            'build:js',
            'build:less',
            'svg'
        ],
        callback
    )
});
