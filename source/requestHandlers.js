
var macaddress = require('macaddress'); // potøebuji k získání MAC -> jedineèná identifikace (není úplnì nutné)
var jsonWriter = require("./jsonWriter.js");

function track(response,GETvariables,redisClient) { // když je pathname /track -> pøijímáme GET parametry
  console.log("Request handler 'track' was called.");
    macaddress.one(function (err, mac) { // získání MAC adresy
      var d = new Date();
      var sessionID = mac+"-"+d.getTime(); // string "mac-èas_v_milisekundách" = session id
      jsonWriter.writeJson(GETvariables,redisClient,sessionID); 
  });
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Thank you for posting your GET data!");
  response.end();
}

function Default(response) { // pokud nìkdo nezaná /xxx nebo zadá jen adresu a port, zobrazí se mu jednoduchý formuláø
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Welcome!");
  response.end();
}

exports.default = Default;
exports.track = track;
