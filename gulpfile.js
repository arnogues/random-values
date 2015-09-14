'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');

var paths = {
  scripts: ['lib/*.js', 'lib/**/*.js'],
  test: ['test/*.js', 'test/**/*.js']
};


gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
   /* .on('error', function (err) {
      mochaErr = err;
    })*/
    //.pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['default']);
  gulp.watch(paths.test, ['default']);
});


gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
gulp.task('dev', ['static', 'test', 'watch']);
