/*
 * seqex: test/api/program/ProgramExecutorSpec.js
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
  var ProgramAPI = requireLib('/api/program/Program');
  var Program = ProgramAPI.Program;

  // test program data
  var program_good_1 = {
    name: "Program 1",
    description: "This is Program #1",
    script: [
      { "offset": 250, "actions": [ { "device": "DEVICE_1", "action": "ON" } ] },
      { "offset": 500, "actions": [ { "device": "DEVICE_1", "action": "OFF" } ] }
    ]
  };

  var program_bad_1 = {
    description: "This is Program #1 - Bad"
  };


  describe('Program', function () {

    it('should be defined', function() {
      expect(Program).to.not.be.undefined;
    });

    describe('constructor', function () {

      it('should build a new instance', function() {
        var program = new Program(program_good_1);
        expect(program).to.not.be.undefined;
        expect(program).to.have.property('name', 'Program 1');
        expect(program).to.have.property('description', 'This is Program #1');
        expect(program).to.have.property('script');
      });


      it('should throw an error for bad data', function() {
        expect(function() {
          return new Program(program_bad_1);
        }).to.throw(ProgramAPI.ProgramError);
      });

    });

  });

}());  