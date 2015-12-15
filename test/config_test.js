var expect = require("chai").expect;
var cfg = require("../source/config.js");
var should = require('chai').should();
var port = {
  "minport" : 1000,
  "maxport" : 65536
  };

describe('config', function () {

    it('should return an JSON', function () {
        cfg.should.be.an("object");
    });
 
    it('should have properties httpConfig that is an object', function () {
      expect(cfg).to.have.property('httpConfig').that.is.an("object");
    });
    it('should have properties redisConfigthat is an object', function () {
      expect(cfg).to.have.property('redisConfig').that.is.an("object");
    });

    it('should return httpConfig with valid port > '+port.minport+' and < '+port.maxport, function () {
       expect(cfg.httpConfig.port).to.be.within(port.minport,port.maxport);
    });
    it('should return redisConfig with valid port > '+port.minport+' and < '+port.maxport, function () {
       expect(cfg.redisConfig.port).to.be.within(port.minport,port.maxport);
    });

    it('should return httpConfig with valid host', function () {
        cfg.httpConfig.should.have.property('host').which.is.String;
    });
    it('should return redisConfig with valid host', function () {
        cfg.redisConfig.should.have.property('host').which.is.String;
    });

});
