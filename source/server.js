// JavaScript Document

var config = require("./config");  // import konfigurace server�
var http = require("http"); // pot�ebujeme ke spu�t�n� http
var redis = require('redis'); // datab�ze redis
var redisClient = redis.createClient(config.redisConfig); // nov� klient -> pro z�pis do redisu

var router = require("./router"); // import na�eho modulu router

http.createServer(function(request, response) {
                    var url = require("url");   // pot�ebujeme pro zpracov�n� URL
                    var pathname = url.parse(request.url).pathname; // z�sk�v�me cestu z address baru
                    var GETvariables = url.parse(request.url, true).query; // funkce vr�t� GET atributy
                    router.route(response, redisClient, pathname, GETvariables); // vol�me router 
                  }).listen(config.httpConfig); // spou�t�me server, s callbackem -> ten se spust� jakmile n�kdo zad� adresu do prohl�e�e
console.log("server running..");
redisClient.on('connect', function() { // spou�t�me p�ipojen� k redis
  console.log('connected to redis..');
});
