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
var handleError = function(req, err) {
  switch (err.type) {
    case "ALREADY_STARTED":
      req.reply(err.message).code(412);
      break;
    case "CONFLICT":
      req.reply(err.message).code(409);
      break;
    case "NOT_FOUND":
      req.reply(err.message).code(404);
      break;
    case "NOT_IMPLEMENTED":
      req.reply(err.message).code(501);
      break;
    case "NOT_RUNNING":
      req.reply(err.message).code(412);
      break;
    default:
      req.reply(err.message).code(500);
  }
};

// route handlers
var addProgramHandler = function (req) {
  service.addProgram(req.payload, function(program) {
    req.reply(program).code(201).header('Location: /api/program/' + program.id);  
  }, function(err) {
    handleError(req, err);
  });  
};

var deleteProgramHandler = function (req) {
  service.deleteProgram(req.params.id, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

var getProgramHandler = function (req) {
  service.getProgram(req.params.id, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

var patchProgramHandler = function (req) {
  service.patchProgram(req.params.id, req.payload, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

var programTaskHandler = function (req) {
	var id = req.params.id;
	var action = req.params.action;
	switch (action) {
		case 'start':
      service.startProgram(id, function(program) {
        req.reply(program);
      }, function(err) {
        handleError(req, err);
      });
      break;
		case 'stop':
      service.stopProgram(id, function(program) {
        req.reply(program);
      }, function(err) {
        handleError(req, err);
      });
      break;
		default:
      req.reply('Unknown Action - ' + action).code(400);
	}
};

var retrieveProgramsHandler = function (req) {
  service.getPrograms({}, function(programs) {
    req.reply(programs);
  }, function(err) {
    handleError(req, err);
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
