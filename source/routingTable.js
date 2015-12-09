
var requestHandlers = require("./requestHandlers"); // import na�eho modulu requestHandlers

var routingTable = {};
routingTable["/"] = requestHandlers.default;
routingTable["/track"] = requestHandlers.track;

module.exports = routingTable; 