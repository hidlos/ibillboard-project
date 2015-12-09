// JavaScript Document
var routingTable = require("./routingTable.js");

function Route(response, redisClient, pathname, GETvariables) {
  console.log("About to route a request for " + pathname);
  if (typeof routingTable[pathname] === 'function') // v p��pad� �e je v routingTable pathname spust�me funkci
    return routingTable[pathname](response,GETvariables,redisClient);
  else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}
exports.route = Route;