var fs = require("fs"); // potøebujeme modul pro práci se soubory
var randomBetweenTwoNumbers = require("./randomBetweenTwoNumbers.js");
var redisUpdater = require("./redisUpdater.js");

function WriteJson(GETvariables,redisClient,sessionID) {
  var IOmanageFile = __dirname+'/IOmanage';
  var JSONFile = __dirname+"/data.json";
  
  fs.readFile(IOmanageFile, 'utf8', function(err, data) { // ètu soubor IOmanage
    if (data.length) { // obsahuje-li nìco, volám opìt tuto funkci v náhodnì vygenerovaný èas
      var msc =  randomBetweenTwoNumbers.randomize(1,50);
      console.log("nemuzu zapisovat, cekam "+msc+" milisekund");
      setTimeout(function() {
        WriteJson(GETvariables,redisClient,sessionID);
      }, msc)
    }
    else { // pokud je prázdný
      fs.writeFileSync(IOmanageFile, sessionID, 'utf8'); // zapisuji synchronnì, aby mì nikdo nepøedbìhl
      fs.readFile(JSONFile, 'utf8', function(err, data) { // a už naèítám JSON, teï už mùžu callbackem, nikdo jiný už by nemìl k souboru pøistupovat
        var json = {};
        if (!err) // existuje-li jasoò                                  
          if (data.length) json = JSON.parse(data); // a je tam už záznam, pak naèti
        json[sessionID.toString()] = GETvariables; // pøidávám do jasonì "objekt" s "ID" = MAC-MILISEKUNDY a "parametry" z GET
        fs.writeFile(JSONFile, JSON.stringify(json), function (err) { // pøepisuji data.json - append nelze
          fs.writeFile(IOmanageFile, "", function (err) {}); // teï už mùžu i asyn vyprázdnit IOmanage
        });  
        redisUpdater.updateRedis(GETvariables,redisClient);
      });  
    }
  });
}

exports.writeJson = WriteJson;