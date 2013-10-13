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
  var ProgramExecutor = requireLib('/api/program/ProgramExecutor');

  // test program data
  var program = {
    id: 123,
    name: 'Program1'
  }

  describe('ProgramExecutor', function () {

    it('should be defined', function() {
      expect(ProgramExecutor).to.not.be.undefined;
    });

    it('should define an isRunning method', function() {
      expect(ProgramExecutor).to.respondTo('isRunning');
    });

    it('should define a startProgram method', function() {
      expect(ProgramExecutor).to.respondTo('startProgram');
    });

    it('should define a stopProgram method', function() {
      expect(ProgramExecutor).to.respondTo('stopProgram');
    });

    describe('start/stop', function () {

      var pexec = new ProgramExecutor(program);

      it('should construct a new instance', function() {
        expect(pexec).to.not.be.undefined;
      });

      it('should start the program', function (done) {
        pexec.startProgram(function() {
          done();
        }, function(error) {
          done(error);
        });
      });

      it('should not restart a running program', function (done) {
        pexec.startProgram(function() {
          done(new Error("Incorrectly restarted a running program"));
        }, function(error) {
          expect(error).to.not.be.undefined;
          done();
        });
      });

      it('should be running since it was started', function() {
        expect(pexec.isRunning()).to.true;
      });

      it('should stop the program', function (done) {
        pexec.stopProgram(function() {
          done();
        }, function(error) {
          done(error);
        });
      });

      it('should not stop a halted program', function (done) {
        pexec.stopProgram(function() {
          done(new Error("Incorrectly stopped a halted program"));
        }, function(error) {
          expect(error).to.not.be.undefined;
          done();
        });
      });

      it('should not be running since it was halted', function() {
        expect(pexec.isRunning()).to.false;
      });

    });

  });

}());  