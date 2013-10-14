/*
 * seqex: api/program/ProgramExecutor.js
 * Program Executor logic for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

function ProgramExecutor(program) {
  this.program = program;
  this.running = false;
}

var error = function(type, message) {
  var error = new Error(message);
  error.type = type;
  return error;
};

ProgramExecutor.prototype.isRunning = function() {
  return this.running;
};

ProgramExecutor.prototype.startProgram = function(success, failure) {
  if (!this.isRunning()) {
    this.running = true;
    success('startProgramExecutor(' + this.program.id + ')');
  } else {
    failure(error('ALREADY_STARTED', 'Program Id (' + this.program.id + ') is already running.'));
  }  
};

ProgramExecutor.prototype.stopProgram = function(success, failure) {
  if (this.isRunning()) {
    this.running = false;
    success('stopProgramExecutor(' + this.program.id + ')');
  } else {
      failure(error('NOT_RUNNING', 'Program Id (' + this.program.id + ') is not running.'));
  }  
};

// export the class
module.exports = ProgramExecutor;