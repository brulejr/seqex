/*
 * seqex: api/program/Program.js
 * Program definition for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Utils = require('hoek');


function Program(program) {
  Utils.assert(program, 'Missing program');
  Utils.assert(program.devices, 'Missing device definitions');
}

// export the class
module.exports = Program;