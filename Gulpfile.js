'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');

const b = watchify(browserify({
	entries: './src/main.jsx',
	cache: {},
	packageCache: {},
	debug: true,
	require:['react', 'react-dom']
}));

gulp.task('watch:js', bundle);
b.on('update', bundle);
// b.on('log', gutil.log);

function bundle() {
	console.log('bundle is working');
	return b
		.transform('babelify', {presets : ['es2015', 'react']})
		.bundle()
		.on('error',gutil.log)
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./'))
}

gulp.task('nodemon', serve);

function serve() {
  nodemon({
    script: 'server/server.js',
    ignore: ['client/', 'build/']
  });
}


gulp.task('default', ['watch:js', 'nodemon']);
