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

var programs = [];
var programId = 0;

var error = function(type, message) {
  var error = new Error(message);
	error.type = type;
	return error;
}
var findProgram = function(id) {
	for (var i=0,len=programs.length; i<len; i++) {
    if (programs[i].id == id) {
    	return i;
    }
	}
	return -1;
};

// program apis
exports.addProgram = function(program, success, failure) {
	program.id = programId++;
	programs.push(program);
	success(program);
};

exports.deleteProgram = function(id, success, failure) {
	var index = findProgram(id);
	if (index >= 0) {
		var program = programs.splice(index, 1);
    eventEmitter.emit('STOP_PROGRAM', id);
		success(program);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

exports.getProgram = function(id, success, failure) {
	var index = findProgram(id);
	if (index >= 0) {
		success(programs[index]);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

exports.getPrograms = function(query, success, failure) {
	success(programs);
};

exports.patchProgram = function(id, program, success, failure) {
	var index = findProgram(id);
	if (index >= 0) {
		program.id = id;
		programs[index] = program;
		success(program);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
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
