/*
 * seqex: api/program/Program.js
 * Program definition for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Joi = require('joi');

// define program json schema
var schema = {
    id: Joi.types.Number(),
    name: Joi.types.String().required(),
    description: Joi.types.String()
};


/**
 * Program error for invalid programs
 */
function ProgramError(error) {
  this.error = error;
}
ProgramError.prototype = new Error();
ProgramError.prototype.constructor = ProgramError;


function Program(program) {
  var err = Joi.validate(program, schema);
  if (err) {
    throw new ProgramError(err);
  }
  this.id = program.id;
  this.name = program.name;
  this.description = program.description;
}

// export the class
module.exports.Program = Program;
module.exports.ProgramError = ProgramError;
