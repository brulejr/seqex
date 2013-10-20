/*
 * seqex: api/device/Device.js
 * Device definition for the seqex device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Joi = require('joi');

var schema = {
    id: Joi.types.String().regex(/[a-zA-Z0-9_]{3,30}/).required(),
    enabled: Joi.types.Boolean().required(),
    description: Joi.types.String(),
};


/**
 * Device error for invalid devices
 */
function DeviceError(error) {
  this.error = error;
}
DeviceError.prototype = new Error();
DeviceError.prototype.constructor = DeviceError;


function Device(device) {
  var err = Joi.validate(device, schema);
  if (err) {
    throw new DeviceError(err);
  }
  this.id = device.id;
  this.description = device.description;
  this.enabled = device.enabled;
}


// export the class
module.exports.Device = Device;
module.exports.DeviceError = DeviceError;
