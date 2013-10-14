/*
 * seqex: server/server.js
 * Configuration for the seqex server module
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Hapi = require('hapi');
var appcfg = require("config").SEQEX;
var program = requireLib('api/program');
var routes = require('./routes');

// configure http server
var serverPort = process.env.PORT || appcfg.serverPort;
var server = new Hapi.Server('0.0.0.0', serverPort, {});
server.addRoutes(routes);
server.addRoutes(program.routes);

// export application configuration
module.exports = server;
