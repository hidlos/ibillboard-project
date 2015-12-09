var fs = require("fs"); // pot�ebujeme modul pro pr�ci se soubory
var randomBetweenTwoNumbers = require("./randomBetweenTwoNumbers.js");
var redisUpdater = require("./redisUpdater.js");

function WriteJson(GETvariables,redisClient,sessionID) {
  var IOmanageFile = __dirname+'/IOmanage';
  var JSONFile = __dirname+"/data.json";
  
  fs.readFile(IOmanageFile, 'utf8', function(err, data) { // �tu soubor IOmanage
    if (data.length) { // obsahuje-li n�co, vol�m op�t tuto funkci v n�hodn� vygenerovan� �as
      var msc =  randomBetweenTwoNumbers.randomize(1,50);
      console.log("nemuzu zapisovat, cekam "+msc+" milisekund");
      setTimeout(function() {
        WriteJson(GETvariables,redisClient,sessionID);
      }, msc)
    }
    else { // pokud je pr�zdn�
      fs.writeFileSync(IOmanageFile, sessionID, 'utf8'); // zapisuji synchronn�, aby m� nikdo nep�edb�hl
      fs.readFile(JSONFile, 'utf8', function(err, data) { // a u� na��t�m JSON, te� u� m��u callbackem, nikdo jin� u� by nem�l k souboru p�istupovat
        var json = {};
        if (!err) // existuje-li jaso�                                  
          if (data.length) json = JSON.parse(data); // a je tam u� z�znam, pak na�ti
        json[sessionID.toString()] = GETvariables; // p�id�v�m do jason� "objekt" s "ID" = MAC-MILISEKUNDY a "parametry" z GET
        fs.writeFile(JSONFile, JSON.stringify(json), function (err) { // p�episuji data.json - append nelze
          fs.writeFile(IOmanageFile, "", function (err) {}); // te� u� m��u i asyn vypr�zdnit IOmanage
        });  
        redisUpdater.updateRedis(GETvariables,redisClient);
      });  
    }
  });
}

exports.writeJson = WriteJson;