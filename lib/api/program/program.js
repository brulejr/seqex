/*
 * seqex: api/program/program.js
 * Program execution logic for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

function ProgramManager() {
	this.programs = [];
  this.programId = 0;
}

var error = function(type, message) {
  var error = new Error(message);
	error.type = type;
	return error;
}

var findProgram = function(programs, id) {
	for (var i=0,len=programs.length; i<len; i++) {
    if (programs[i].id == id) {
    	return i;
    }
	}
	return -1;
};

ProgramManager.prototype.addProgram = function(program, success, failure) {
  program.id = this.programId++;
  this.programs.push(program);
  success(program);
};

ProgramManager.prototype.deleteProgram = function(id, success, failure) {
	var index = findProgram(this.programs, id);
	if (index >= 0) {
		success(this.programs.splice(index, 1));
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

ProgramManager.prototype.getProgram = function(id, success, failure) {
	var index = findProgram(this.programs, id);
	if (index >= 0) {
		success(this.programs[index]);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

ProgramManager.prototype.hasProgram = function(id) {
	return findProgram(this.programs, id) >= 0;
};

ProgramManager.prototype.retrievePrograms = function(success, failure) {
	success(this.programs);
};

ProgramManager.prototype.updateProgram = function(id, program, success, failure) {
	var index = findProgram(this.programs, id);
	if (index >= 0) {
		program.id = id;
		this.programs[index] = program;
		success(program);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

// export the class
module.exports.ProgramManager = ProgramManager;