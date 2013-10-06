/*
 * seqex: server/index.js
 * Entry point for the seqex server module
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
require('pkginfo')(module, 'name', 'version');
var server = require("./server");

// server startup
exports.start = function() {
  var appname = module.exports.name;
  var version = module.exports.version;
  server.start(function() {
    console.log('Starting %s v%s on %s', appname, version, server.info.uri);
  });
};
