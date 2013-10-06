/*
 * seqex: api/program/service.js
 * Service backing the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var events = require('events');
var eventEmitter = new events.EventEmitter();

// program apis
exports.addProgram = function(program, failure, success) {
	success({ id: '123' });
};

exports.deleteProgram = function(id, failure, success) {
	eventEmitter.emit('STOP_PROGRAM', id);
	success('deleteProgram(' + id + ')');
};

exports.getProgram = function(id, failure, success) {
	success('getProgram(' + id + ')');
};

exports.getPrograms = function(query, failure, success) {
	success('getPrograms');
};

exports.patchProgram = function(program, failure, success) {
	success({ id: '123456' });
};

exports.startProgram = function(id, failure, success) {
	eventEmitter.emit('START_PROGRAM', id);
	success('startProgram(' + id + ')');
};

exports.stopProgram = function(id, failure, success) {
	eventEmitter.emit('STOP_PROGRAM', id);
	success('stopProgram(' + id + ')');
};
