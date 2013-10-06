/*
 * seqex: api/program/index.js
 * Routes for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var service = require('./service');

// general functions
var errorHandler = function(err) {
  switch (err.type) {
    case "NOT_FOUND":
      req.reply(err).code(404);
      break;
    case "CONFLICT":
      req.reply(err).code(409);
      break;
    default:
      req.reply(err).code(500);
  }
};

// route handlers
var addProgramHandler = function (req) {
  service.addProgram(req.payload, errorHandler, function(program) {
    req.reply(program).code(201).header('Location: /api/program/' + program.id);  
  });  
};

var deleteProgramHandler = function (req) {
  service.deleteProgram(req.params.id, errorHandler, function(program) {
    req.reply(program);
  });
};

var getProgramHandler = function (req) {
  service.getProgram(req.params.id, errorHandler, function(program) {
    req.reply(program);
  });
};

var patchProgramHandler = function (req) {
  service.patchProgram(req.payload, errorHandler, function(program) {
    req.reply(program);
  });
};

var programTaskHandler = function (req) {
	var id = req.params.id;
	var action = req.params.action;
	switch (action) {
		case 'start':
      service.startProgram(id, errorHandler, function(program) {
        req.reply(program);
      });
		case 'stop':
      service.stopProgram(id, errorHandler, function(program) {
        req.reply(program);
      });
		default:
      req.reply('Unknown Action - ' + action).code(400);
	}
};

var retrieveProgramsHandler = function (req) {
  service.getPrograms({}, errorHandler, function(programs) {
    req.reply(programs);
  });
};


// route definitions
var baseuri = function(uri) {
	return '/api/program/v1' + uri;
};
module.exports = [
  { method: 'GET', path: baseuri('/programs'), config: { handler: retrieveProgramsHandler } },
  { method: 'GET', path: baseuri('/programs/{id}'), config: { handler: getProgramHandler } },
  { method: 'DELETE', path: baseuri('/programs/{id}'), config: { handler: deleteProgramHandler } },
  { method: 'POST', path: baseuri('/programs'), config: { handler: addProgramHandler } },
  { method: 'PATCH', path: baseuri('/programs/{id}'), config: { handler: patchProgramHandler } },
  { method: 'POST', path: baseuri('/programs/{id}/{action}'), config: { handler: programTaskHandler } }
];
