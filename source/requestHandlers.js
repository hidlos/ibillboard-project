
var macaddress = require('macaddress'); // pot�ebuji k z�sk�n� MAC -> jedine�n� identifikace (nen� �pln� nutn�)
var jsonWriter = require("./jsonWriter.js");

function track(response,GETvariables,redisClient) { // kdy� je pathname /track -> p�ij�m�me GET parametry
  console.log("Request handler 'track' was called.");
    macaddress.one(function (err, mac) { // z�sk�n� MAC adresy
      var d = new Date();
      var sessionID = mac+"-"+d.getTime(); // string "mac-�as_v_milisekund�ch" = session id
      jsonWriter.writeJson(GETvariables,redisClient,sessionID); 
  });
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Thank you for posting your GET data!");
  response.end();
}

function Default(response) { // pokud n�kdo nezan� /xxx nebo zad� jen adresu a port, zobraz� se mu jednoduch� formul��
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Welcome!");
  response.end();
}

exports.default = Default;
exports.track = track;
