/*
 * seqex: api/program/service.js
 * Service backing the seqex program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// program apis
exports.addProgram = function(program, failure, success) {
	success({ id: '123' });
};

exports.deleteProgram = function(id, failure, success) {
	success('deleteProgram(' + id + ')');
};

exports.getProgram = function(id, failure, success) {
	success('getProgram(' + id + ')');
};

exports.getPrograms = function(query, failure, success) {
	success('getPrograms');
};

exports.patchProgram = function(program, failure, success) {
	success({ id: '123456' });
};

exports.startProgram = function(id, failure, success) {
	success('startProgram(' + id + ')');
};

exports.stopProgram = function(id, failure, success) {
	success('stopProgram(' + id + ')');
};
