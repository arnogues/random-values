'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');


var production = process.argv.indexOf('build') !== -1;

var paths = {
  scripts: ['src/*.js', 'src/**/*.js'],
  test: ['test/*.js', 'test/**/*.js']
};


gulp.task('static', function () {
  return gulp.src(['src/*.js', 'gulpfile.js'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        prod: production
      }
    }))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('browserify', function () {
  // Single entry point to browserify
  gulp.src('src/index.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: false,
      ignore: ['node_modules']
    }))
    .pipe(gulp.dest('./lib/'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['default']);
});


gulp.task('prepublish', ['nsp']);
gulp.task('build', ['static', 'browserify', 'test']);
gulp.task('default', ['static', 'browserify', 'test']);
gulp.task('dev', ['static', 'watch']);
