/*
 * seqex: api/program/ProgramManager.js
 * Program Manager logic for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Hash = require('nork-hash');
var ProgramExecutor = require('./ProgramExecutor');

var ProgramAPI = requireLib('/api/program/Program');
var Program = ProgramAPI.Program;
var ProgramError = ProgramAPI.ProgramError;

function ProgramManager() {
  this.programId = 0;
  this.programs = new Hash();
}

var error = function(type, message) {
  var error = new Error(message);
	error.type = type;
	return error;
};

ProgramManager.prototype.addProgram = function(program, success, failure) {
  try {
    program.id = 'PROGRAM_' + ++this.programId;
    this.programs.put(program.id, new Program(program));
    success(program);
  } catch(err) {
    if (err instanceof ProgramError) {
      failure(error('INVALID', 'Invalid Program - ' + err.error.message));
    } else {
      failure(err);
    }
  }  
};

ProgramManager.prototype.deleteProgram = function(id, success, failure) {
  if (this.programs.has(id)) {
    var program = this.programs.get(id);
    this.programs.remove(id);
		success(program);
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

ProgramManager.prototype.getProgram = function(id, success, failure) {
  if (this.programs.has(id)) {
		success(this.programs.get(id));
	} else {
		failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
	}
};

ProgramManager.prototype.hasProgram = function(id) {
	return this.programs.has(id);
};

ProgramManager.prototype.retrievePrograms = function(success, failure) {
  try {
    success(this.programs.values());
  } catch(err) {
    failure(err);
  }
};

ProgramManager.prototype.startProgram = function(id, success, failure) {
  var exec = this.running.get(id);
  if (!exec) {
    var program = getProgram(this.programs, id);
    if (program) {
      this.running.put(id, exec = new ProgramExecutor(program));
      exec.startProgram(success, failure);
    } else {
      failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
    }
  } else {
    exec.startProgram(success, failure);
  }
};
  
ProgramManager.prototype.stopProgram = function(id, success, failure) {
  var exec = this.running.get(id);
  if (exec) {
    exec.stopProgram(success, failure);
  } else {
      failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
  }  
};

ProgramManager.prototype.updateProgram = function(id, program, success, failure) {
  try {
    if (id) {
      if (this.programs.has(id)) {
        var updatedProgram = new Program(program);
        updatedProgram.id = id;
        this.programs.put(id, program);
        success(program);
      } else {
        failure(error('NOT_FOUND', 'Unknown Program Id - ' + id));
      }
    } else {
      failure(error('INVALID', 'Invalid Program - Missing Program ID'));
    }
  } catch(err) {
    if (err instanceof ProgramError) {
      failure(error('INVALID', 'Invalid Program - ' + err.error.message));
    } else {
      failure(err);
    }
  }  

};

// export the class
module.exports = ProgramManager;