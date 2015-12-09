// JavaScript Document

var config = require("./config");  // import konfigurace serverù
var http = require("http"); // potøebujeme ke spuštìní http
var redis = require('redis'); // databáze redis
var redisClient = redis.createClient(config.redisConfig); // nový klient -> pro zápis do redisu

var router = require("./router"); // import našeho modulu router

http.createServer(function(request, response) {
                    var url = require("url");   // potøebujeme pro zpracování URL
                    var pathname = url.parse(request.url).pathname; // získáváme cestu z address baru
                    var GETvariables = url.parse(request.url, true).query; // funkce vrátí GET atributy
                    router.route(response, redisClient, pathname, GETvariables); // voláme router 
                  }).listen(config.httpConfig); // spouštíme server, s callbackem -> ten se spustí jakmile nìkdo zadá adresu do prohlížeèe
console.log("server running..");
redisClient.on('connect', function() { // spouštíme pøipojení k redis
  console.log('connected to redis..');
});
