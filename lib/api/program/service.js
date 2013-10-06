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

var manager = new (require('./program').ProgramManager);


// program apis
exports.addProgram = function(program, success, failure) {
	success(manager.addProgram(program));
};

exports.deleteProgram = function(id, success, failure) {
	var result = manager.deleteProgram(id);
	if (result instanceof Error) {
    failure(result);
	} else {
    eventEmitter.emit('STOP_PROGRAM', id);
    success(result);
	}
};

exports.getProgram = function(id, success, failure) {
	var result = manager.getProgram(id);
	if (result instanceof Error) {
    failure(result);
	} else {
    success(result);
	}
};

exports.getPrograms = function(query, success, failure) {
	success(manager.retrievePrograms());
};

exports.patchProgram = function(id, program, success, failure) {
	var result = manager.updateProgram(id, program);
	if (result instanceof Error) {
    failure(result);
	} else {
    success(result);
	}
};

exports.startProgram = function(id, success, failure) {
	eventEmitter.emit('START_PROGRAM', id);
	success('startProgram(' + id + ')');
};

exports.stopProgram = function(id, success, failure) {
	eventEmitter.emit('STOP_PROGRAM', id);
	success('stopProgram(' + id + ')');
};
