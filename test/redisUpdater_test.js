var expect = require("chai").expect;
var should = require('chai').should();
var assert = require('chai').assert
var redisUpdater = require("../source/redisUpdater.js");



/*
1 ma funkci count = cislo pripocte
2 ma funkci count = neni cislo nepripocte
3 má spatneho redisClienta = shit

function UpdateRedis(GETvariables,redisClient) {
  if(GETvariables.hasOwnProperty('count')) { 
    redisClient.incrby('count', GETvariables.count, function(err, reply) {
      redisClient.get("count", function(err,reply) {
        console.log("nova hodnota parametru count je: "+reply);
      });
    });            
  }; 
}
*/

describe('redisUpdater', function () {

  it("GETvariables contains count property and it's integer, then increase parameter count in redis", function(done) {
    var GETvariables = {
      "count" : 25 
    }
    
    var redisClient = require('../node_modules/redis').createClient();
    redisClient.on('error', function (err) {});
    
    redisClient.get("count", function(err,reply) {
      var previous_count = parseInt(reply);
      redisUpdater.updateRedis(GETvariables, redisClient);      
      
      redisClient.get("count", function(err,reply) {
        var actual_count = parseInt(reply);
        expect(previous_count+GETvariables.count).to.equal(actual_count);       
        done();
      });
    });
  });

  it("GETvariables contains count property and it isn't integer, then parameter count in redis will not change", function(done) {
    var GETvariables = {
      "count" : "25j" 
    }
    
    var redisClient = require('../node_modules/redis').createClient();
    redisClient.on('error', function (err) {});
    
    redisClient.get("count", function(err,reply) {
      var previous_count = parseInt(reply);
      redisUpdater.updateRedis(GETvariables, redisClient);      
      
      redisClient.get("count", function(err,reply) {
        var actual_count = parseInt(reply);
        expect(previous_count).to.equal(actual_count);       
        done();
      });
    });
  });

  it("GETvariables not contains count property, then parameter count in redis will not change", function(done) {
    var GETvariables = {
      "countz" : 25 
    }
    
    var redisClient = require('../node_modules/redis').createClient();
    redisClient.on('error', function (err) {});
    
    redisClient.get("count", function(err,reply) {
      var previous_count = parseInt(reply);
      redisUpdater.updateRedis(GETvariables, redisClient);      
      
      redisClient.get("count", function(err,reply) {
        var actual_count = parseInt(reply);
        expect(previous_count).to.equal(actual_count);       
        done();
      });
    });
  });

  it("should return error, when the redisClient isn't properly loaded", function(done) {
    var GETvariables = {
      "count" : 25 
    }
    var redisClient = {};
    redisUpdater.updateRedis(GETvariables, redisClient);      
    done();
  });


});
