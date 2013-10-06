/*
 * seqex: server/routes.js
 * Route definitions for the seqex server module
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
require('pkginfo')(module);

// main page handler
var rootHandler = function (req) {
  req.reply('Hello World');
};

// route definitions
module.exports = [
  { method: 'GET', path: '/', config: { handler: rootHandler } }
];
