
var requestHandlers = require("./requestHandlers"); // import našeho modulu requestHandlers

var routingTable = {};
routingTable["/"] = requestHandlers.default;
routingTable["/track"] = requestHandlers.track;

module.exports = routingTable; 