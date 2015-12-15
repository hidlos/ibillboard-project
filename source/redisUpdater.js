
function UpdateRedis(GETvariables,redisClient) {
  if(GETvariables.hasOwnProperty('count')) { 
    if (typeof redisClient.incrby === 'function')
      redisClient.incrby('count', GETvariables.count, function(err, reply) {
        redisClient.get("count", function(err,reply) {
          console.log("nova hodnota parametru count je: "+reply);
        });
      });
    else throw new Error('redisClient is not defined');
  }; 
}

exports.updateRedis = UpdateRedis;