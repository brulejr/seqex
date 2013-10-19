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

var DeviceManager = require('./DeviceManager');
var deviceManager = new DeviceManager();

var ProgramManager = require('./ProgramManager');
var programManager = new ProgramManager();


// apis
exports.addDevice = function(device, success, failure) {
	deviceManager.addDevice(device, success, failure);
};

exports.addProgram = function(program, success, failure) {
	programManager.addProgram(program, success, failure);
};

exports.deleteDevice = function(id, success, failure) {
	deviceManager.deleteDevice(id, function(result) {
    success(result);
	}, failure);
};

exports.deleteProgram = function(id, success, failure) {
	programManager.deleteProgram(id, function(result) {
    eventEmitter.emit('STOP_PROGRAM', id);
    success(result);
	}, failure);
};

exports.getDevice = function(id, success, failure) {
	deviceManager.getDevice(id, success, failure);
};

exports.getProgram = function(id, success, failure) {
	programManager.getProgram(id, success, failure);
};

exports.getDevices = function(query, success, failure) {
	deviceManager.retrieveDevices(success, failure);
};

exports.getPrograms = function(query, success, failure) {
	programManager.retrievePrograms(success, failure);
};

exports.patchDevice = function(id, device, success, failure) {
	deviceManager.updateDevice(id, device, success, failure);
};

exports.patchProgram = function(id, program, success, failure) {
	programManager.updateProgram(id, program, success, failure);
};

exports.startProgram = function(id, success, failure) {
	programManager.startProgram(id, success, failure);
};

exports.stopProgram = function(id, success, failure) {
	programManager.stopProgram(id, success, failure);
};
