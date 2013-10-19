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
    if (!this.devices.has(device.id)) {
      this.devices.put(device.id, device);
      success(device);
    } else {
      failure(error('CONFLICT', 'Duplicate Device Id - ' + device.id));
    }
  } catch(err) {
    failure(err);
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
	if (this.devices.has(id)) {
		device.id = id;
    this.devices.put(id, device);
		success(device);
	} else {
		failure(error('NOT_FOUND', 'Unknown Device Id - ' + id));
	}
};

// export the class
module.exports = DeviceManager;