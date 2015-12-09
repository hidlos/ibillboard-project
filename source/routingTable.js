
var requestHandlers = require("./requestHandlers"); 

var routingTable = {};
routingTable["/"] = requestHandlers.default;
routingTable["/track"] = requestHandlers.track;

module.exports = routingTable; 