/*
 * seqex: api/program/index.js
 * Routes for the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var handlers = require('./handlers');

// route definitions
var baseuri = function(uri) {
	return '/api/program/v1' + uri;
};
module.exports = [

  { method: 'GET', path: baseuri('/devices'), config: { handler: handlers.retrieveDevicesHandler } },
  { method: 'GET', path: baseuri('/devices/{id}'), config: { handler: handlers.getDeviceHandler } },
  { method: 'DELETE', path: baseuri('/devices/{id}'), config: { handler: handlers.deleteDeviceHandler } },
  { method: 'POST', path: baseuri('/devices'), config: { handler: handlers.addDeviceHandler } },
  { method: 'PATCH', path: baseuri('/devices/{id}'), config: { handler: handlers.patchDeviceHandler } },

  { method: 'GET', path: baseuri('/programs'), config: { handler: handlers.retrieveProgramsHandler } },
  { method: 'GET', path: baseuri('/programs/{id}'), config: { handler: handlers.getProgramHandler } },
  { method: 'DELETE', path: baseuri('/programs/{id}'), config: { handler: handlers.deleteProgramHandler } },
  { method: 'POST', path: baseuri('/programs'), config: { handler: handlers.addProgramHandler } },
  { method: 'PATCH', path: baseuri('/programs/{id}'), config: { handler: handlers.patchProgramHandler } },
  { method: 'POST', path: baseuri('/programs/{id}/{action}'), config: { handler: handlers.programTaskHandler } }
  
];
