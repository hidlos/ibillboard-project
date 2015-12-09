
function UpdateRedis(GETvariables,redisClient) {
  if(GETvariables.hasOwnProperty('count')) { 
    redisClient.incrby('count', GETvariables.count, function(err, reply) {
      redisClient.get("count", function(err,reply) {
        console.log("nova hodnota parametru count je: "+reply);
      });
    });            
  }; 
}

exports.updateRedis = UpdateRedis;