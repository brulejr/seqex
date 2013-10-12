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

var ProgramManager = require('./ProgramManager');
var manager = new ProgramManager();


// program apis
exports.addProgram = function(program, success, failure) {
	manager.addProgram(program, success, failure);
};

exports.deleteProgram = function(id, success, failure) {
	manager.deleteProgram(id, function(result) {
    eventEmitter.emit('STOP_PROGRAM', id);
    success(result);
	}, failure);
};

exports.getProgram = function(id, success, failure) {
	manager.getProgram(id, success, failure);
};

exports.getPrograms = function(query, success, failure) {
	manager.retrievePrograms(success, failure);
};

exports.patchProgram = function(id, program, success, failure) {
	manager.updateProgram(id, program, success, failure);
};

exports.startProgram = function(id, success, failure) {
	manager.startProgram(id, success, failure);
};

exports.stopProgram = function(id, success, failure) {
	manager.stopProgram(id, success, failure);
};
