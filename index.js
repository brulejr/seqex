/*
 * seqex
 * https://github.com/brulejr/seqex
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */
 
'use strict';

// module dependencies
require("./utils")
var log4js = require('log4js');
var server = requireLib('server');

// configure logging
log4js.configure('log4js.json', {});

// start application server
server.start();
