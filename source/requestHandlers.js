
var macaddress = require('macaddress'); 
var jsonWriter = require("./jsonWriter.js");

function track(response,GETvariables,redisClient) { 
  console.log("Request handler 'track' was called.");
    macaddress.one(function (err, mac) { 
      var d = new Date();
      var sessionID = mac+"-"+d.getTime(); 
      jsonWriter.writeJson(GETvariables,redisClient,sessionID); 
  });
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Thank you for posting your GET data!");
  response.end();
}

function Default(response) {
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Welcome!");
  response.end();
}

exports.default = Default;
exports.track = track;
