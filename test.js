'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var stripJsonComments = require('./');

it('should strip JSON comments', function (cb) {
	var stream = stripJsonComments();

	stream.on('data', function (file) {
		assert.equal(file.contents.toString(), '         \n{"a":"b"}');
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('//comment\n{"a":"b"}')
	}));
});

it('should strip JSON comments and whitespace with options', function (cb) {
	var options = {whitespace: false};
	var stream = stripJsonComments(options);

	stream.on('data', function (file) {
		assert.equal(file.contents.toString(), '\n{"a":"b"}');
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('//comment   \n{"a":"b"}')
	}));
});

