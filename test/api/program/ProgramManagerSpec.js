/*
 * seqex: test/api/program/ProgramManagerSpec.js
 * https://github.com/jbrule/seqex
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */
(function() {
  'use strict';

  // module dependencies
  require('../../../utils');
  var chai = require('chai');
  var expect = chai.expect;
  var ProgramManager = requireLib('/api/program/ProgramManager');

  // test program data
  var program = {
    id: 123,
    name: 'Program1'
  }

  describe('ProgramManager', function () {

    it('should be defined', function() {
      expect(ProgramManager).to.not.be.undefined;
    });

    it('should define an addProgram method', function() {
      expect(ProgramManager).to.respondTo('addProgram');
    });

    it('should define a deleteProgram method', function() {
      expect(ProgramManager).to.respondTo('deleteProgram');
    });

    it('should define a getProgram method', function() {
      expect(ProgramManager).to.respondTo('getProgram');
    });

    it('should define a hasProgram method', function() {
      expect(ProgramManager).to.respondTo('hasProgram');
    });

    it('should define a retrievePrograms method', function() {
      expect(ProgramManager).to.respondTo('retrievePrograms');
    });

    it('should define a startProgram method', function() {
      expect(ProgramManager).to.respondTo('startProgram');
    });

    it('should define a stopProgram method', function() {
      expect(ProgramManager).to.respondTo('stopProgram');
    });

    it('should define an updateProgram method', function() {
      expect(ProgramManager).to.respondTo('updateProgram');
    });

  });

}());  