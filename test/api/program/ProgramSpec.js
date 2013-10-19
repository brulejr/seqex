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
  var Program = requireLib('/api/program/Program');

  // test program data
  var program = {
    name: "program 1",
    description: "Simple program that alternately switches two devices on and off",
    devices: {
      device1: { description: "This is device #1" },
      device2: { description: "This is device #2" }
    },
    sequences: [
      { duration: 20000,
        events: [ 
          { timeIndex: 0, actions: [ 
            { device: "device1", status: "on" },
            { device: "device2", status: "off" }
          ] },
          { timeIndex: 1000, actions: [ 
            { device: "device1", status: "off" },
            { device: "device2", status: "on" }
          ] }
        ]
      }
    ]
  };


  describe('Program', function () {

    it('should be defined', function() {
      expect(Program).to.not.be.undefined;
    });

    describe('constructor', function () {

      var pexec = new Program(program);

      it('should build a new instance', function() {
        expect(pexec).to.not.be.undefined;
      });

    });

  });

}());  