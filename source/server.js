// JavaScript Document

var config = require("./config");  
var http = require("http"); 
var redis = require('redis'); 
var redisClient = redis.createClient(config.redisConfig); 

var router = require("./router"); 

http.createServer(function(request, response) {
                    var url = require("url");   
                    var pathname = url.parse(request.url).pathname; 
                    var GETvariables = url.parse(request.url, true).query; 
                    router.route(response, redisClient, pathname, GETvariables);  
                  }).listen(config.httpConfig); 
console.log("server running..");
redisClient.on('connect', function() { 
  console.log('connected to redis..');
});
