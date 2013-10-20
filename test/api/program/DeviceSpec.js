/*
 * seqex: test/api/device/DeviceExecutorSpec.js
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
  var DeviceAPI = requireLib('/api/program/Device');
  var Device = DeviceAPI.Device;
  
  // test device data
  var device_good = {
    id: "DEVICE_1",
    description: "This is device #1",
    enabled: true
  };

  var device_bad = {
    id: "DEVICE_@#@",
    description: "This is device #1"
  };

  describe('Device', function () {

    it('should be defined', function() {
      expect(Device).to.not.be.undefined;
    });

    describe('constructor', function () {

      it('should build a new instance for good data', function() {
        var device = new Device(device_good);
        expect(device).to.not.be.undefined;
        expect(device).to.have.property('id', 'DEVICE_1');
        expect(device).to.have.property('enabled', true);
        expect(device).to.have.property('description', 'This is device #1');
      });

      it('should throw an error for bad data', function() {
        var badConstructor = function() {
          return new Device(device_bad);
        };
        expect(badConstructor).to.throw(DeviceAPI.DeviceError);
      });

    });

  });

}());  