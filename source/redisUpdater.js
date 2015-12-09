
function UpdateRedis(GETvariables,redisClient) {
  if(GETvariables.hasOwnProperty('count')) { // je-li v GETu count
    redisClient.incrby('count', GETvariables.count, function(err, reply) { // zvyš count o hodnotu count v redisu
      redisClient.get("count", function(err,reply) { // vypisuji parametr count
        console.log("nova hodnota parametru count je: "+reply);
      });
    });            
  }; 
}

exports.updateRedis = UpdateRedis;