var fs = require("fs"); 
var randomBetweenTwoNumbers = require("./randomBetweenTwoNumbers.js");
var redisUpdater = require("./redisUpdater.js");

function WriteJson(GETvariables,redisClient,sessionID) {
  var IOmanageFile = __dirname+'/IOmanage';
  var JSONFile = __dirname+"/data.json";
  
  fs.readFile(IOmanageFile, 'utf8', function(err, data) { 
    if (data.length) { 
      var msc =  randomBetweenTwoNumbers.randomize(1,50);
      setTimeout(function() {
        WriteJson(GETvariables,redisClient,sessionID);
      }, msc)
    }
    else { 
      fs.writeFileSync(IOmanageFile, sessionID, 'utf8'); 
      fs.readFile(JSONFile, 'utf8', function(err, data) { 
        var json = {};
        if (!err)                                   
          if (data.length) json = JSON.parse(data);
        json[sessionID.toString()] = GETvariables; 
        fs.writeFile(JSONFile, JSON.stringify(json), function (err) { 
          fs.writeFile(IOmanageFile, "", function (err) {}); 
        });  
        redisUpdater.updateRedis(GETvariables,redisClient);
      });  
    }
  });
}

exports.writeJson = WriteJson;