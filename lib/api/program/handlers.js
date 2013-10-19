/*
 * seqex: api/program/handlers.js
 * Routes handlers for the seqex program api
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
exports.addDeviceHandler = function (req) {
  service.addDevice(req.payload, function(device) {
    req.reply(device).code(201).header('Location: /api/device/' + device.id);  
  }, function(err) {
    handleError(req, err);
  });  
};

exports.addProgramHandler = function (req) {
  service.addProgram(req.payload, function(program) {
    req.reply(program).code(201).header('Location: /api/program/' + program.id);  
  }, function(err) {
    handleError(req, err);
  });  
};

exports.deleteDeviceHandler = function (req) {
  service.deleteDevice(req.params.id, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.deleteProgramHandler = function (req) {
  service.deleteProgram(req.params.id, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

exports.getDeviceHandler = function (req) {
  service.getDevice(req.params.id, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.getProgramHandler = function (req) {
  service.getProgram(req.params.id, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

exports.patchDeviceHandler = function (req) {
  service.patchDevice(req.params.id, req.payload, function(device) {
    req.reply(device);
  }, function(err) {
    handleError(req, err);
  });
};

exports.patchProgramHandler = function (req) {
  service.patchProgram(req.params.id, req.payload, function(program) {
    req.reply(program);
  }, function(err) {
    handleError(req, err);
  });
};

exports.programTaskHandler = function (req) {
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

exports.retrieveDevicesHandler = function (req) {
  service.getDevices({}, function(devices) {
    req.reply(devices);
  }, function(err) {
    handleError(req, err);
  });
};

exports.retrieveProgramsHandler = function (req) {
  service.getPrograms({}, function(programs) {
    req.reply(programs);
  }, function(err) {
    handleError(req, err);
  });
};
