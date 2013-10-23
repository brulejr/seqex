/*
 * seqex: api/device/DeviceManager.js
 * Device Manager logic for the seqex device api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Hash = require('nork-hash');

var DeviceAPI = requireLib('/api/program/Device');
var Device = DeviceAPI.Device;
var DeviceError = DeviceAPI.DeviceError;

function DeviceManager() {
	this.devices = new Hash();
}

var error = function(type, message) {
  var error = new Error(message);
	error.type = type;
	return error;
};

DeviceManager.prototype.addDevice = function(device, success, failure) {
  try {
    if (device.id) {
      if (!this.devices.has(device.id)) {
        this.devices.put(device.id, new Device(device));
        success(device);
      } else {
        failure(error('CONFLICT', 'Duplicate Device Id - ' + device.id));
      }
    } else {
      failure(error('INVALID', 'Invalid device - Missing Device ID'));
    }
  } catch(err) {
    if (err instanceof DeviceError) {
      failure(error('INVALID', 'Invalid device - ' + err.error.message));
    } else {
      failure(err);
    }
  }
};

DeviceManager.prototype.deleteDevice = function(id, success, failure) {
	if (this.devices.has(id)) {
    var device = this.devices.get(id);
    this.devices.remove(id)
    success(device);
	} else {
		failure(error('NOT_FOUND', 'Unknown Device Id - ' + id));
	}
};

DeviceManager.prototype.getDevice = function(id, success, failure) {
	if (this.devices.has(id)) {
		success(this.devices.get(id));
	} else {
		failure(error('NOT_FOUND', 'Unknown Device Id - ' + id));
	}
};

DeviceManager.prototype.hasDevice = function(id) {
	return this.devices.has(id);
};

DeviceManager.prototype.retrieveDevices = function(success, failure) {
  try {
    success(this.devices.values());
  } catch(err) {
    failure(err);
  }
};

DeviceManager.prototype.updateDevice = function(id, device, success, failure) {
  try {
    if (id) {
      if (this.devices.has(id)) {
        var updatedDevice = new Device(device);
        updatedDevice.id = id;
        this.devices.put(id, device);
        success(device);
      } else {
        failure(error('NOT_FOUND', 'Unknown Device Id - ' + id));
      }
    } else {
      failure(error('INVALID', 'Invalid device - Missing Device ID'));
    }
  } catch(err) {
    if (err instanceof DeviceError) {
      failure(error('INVALID', 'Invalid device - ' + err.error.message));
    } else {
      failure(err);
    }
  }  
};

// export the class
module.exports = DeviceManager;