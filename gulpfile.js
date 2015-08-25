'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;


gulp.task('default', function(cb) {
    //runSequence('install', 'index', 'watch', 'serve', cb);
    runSequence('install', 'index', 'test', 'serve', 'watch', cb);
});

gulp.task('watch', function() {
    gulp.watch(['static/scripts/**/*.js'], ['test']);
});

gulp.task('install', function(cb) {
    var bower = spawn('bower', ['update', '--config.interactive=false'], {stdio: 'inherit'});

    bower.on('exit', cb);
});

gulp.task('index', function() {
    var inject = require('gulp-inject');

    return gulp.src('static/index.html')
        .pipe(inject(gulp.src(['static/scripts//**/!(*.spec).js'], {read: false}), {
            ignorePath: ['static'],
            addRootSlash: false
        }))
        .pipe(gulp.dest('./static'));
});

gulp.task('serve', function() {
    nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('test', function(cb) {
    var server = new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);

    server.start();
});
