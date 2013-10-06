/*
 * seqex: utils.js
 * Global utilities the seqex application
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

GLOBAL.requireLib = (function(root) {
  return function(resource) {
    return require(root + "/lib/" + resource);
  }
})(__dirname);
