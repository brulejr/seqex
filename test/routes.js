/*
 * seqex: test/integration/routes.js
 * https://github.com/jbrule/seqex
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */
(function() {
  'use strict';

  var chai = require('chai');
  var expect = chai.expect;
  var routes = require('../lib/server/routes');

  describe('Routes', function () {

    it('should define 3 routes', function() {
      expect(routes.length).to.be.equal(3);
    });

    it('should define a "root" route', function(){
      var route = routes[0];
      expect(route).to.have.property('method', 'GET');
      expect(route).to.have.property('path', '/');
      expect(route).to.have.property('config');
      expect(route).to.have.deep.property('config.handler');
    });

    it('should define a "views" route', function(){
      var route = routes[1];
      expect(route).to.have.property('method', 'GET');
      expect(route).to.have.property('path', '/view/{view}');
      expect(route).to.have.property('config');
      expect(route).to.have.deep.property('config.handler');
    });

    it('should define a static content route', function(){
      var route = routes[2];
      expect(route).to.have.property('method', 'GET');
      expect(route).to.have.property('path', '/{path*}');
      expect(route).to.have.property('config');
      expect(route).to.have.deep.property('config.handler');
      expect(route).to.have.deep.property('config.handler.directory');
      expect(route).to.have.deep.property('config.handler.directory.path', './public');
      expect(route).to.have.deep.property('config.handler.directory.listing', false);
      expect(route).to.have.deep.property('config.handler.directory.index', false);
    });

  })

}());