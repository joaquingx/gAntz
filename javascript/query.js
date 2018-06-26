class Query{
    constructor(type){
        this.queryType = [
            {"type":"specimens", "parameters":[
                    "family","subfamily","genus","species","code","country","habitat","type","georeferenced",
                    "bbox","limit", "caste"
                ]},
            {"type":"geoSpecimens", "parameters":[
                    "coords", "radius", "limit", "offset", "distinct"
                ]}
        ];
        this.type = type;
        this.jsonType = this.queryType[this.type];
        this.url = "http://api.antweb.org/v3.1/" + this.jsonType["type"] + "?";
        this.options = {"family":"", "genus": "", "country":"Peru", "limit":"200", "coords" : "",
            "Georeferenced": "1", "radius" : "2", "bbox":"", "month": "", "caste" : ""};
        this.cacheJson = "";
    };

    getJsonVoid() {
        return {"metaData": {"count": "0"} , "specimens" : [] };
    }

    getQueens(rawJson){
        var newJson = this.getJsonVoid();
        for(var actJson in rawJson["specimens"]){
            if(rawJson["specimens"][actJson]["caste"] != ""){
                console.log("aca entra");
                console.log(rawJson["specimens"][actJson]["dateCollected"]);
            }
        }
        //newJson["metaData"]["count"] = newJson["specimens"].length;
        //console.log(newJson);
        return newJson;
    }

    getJsonDate(rawJson){
        var newJson = this.getJsonVoid();
        if(this.options["month"] !== ""){
            for(var actJson in rawJson["specimens"]){
                if(rawJson["specimens"][actJson]["dateCollected"] != undefined){
                    console.log(rawJson["specimens"][actJson]["dateCollected"]);
                    var myDate = new Date(rawJson["specimens"][actJson]["dateCollected"]);
                    var month = myDate.getMonth();
                    //console.log(month);
                    if(month == this.options["month"]){
                        //console.log(myDate);
                        newJson["specimens"].push(rawJson["specimens"][actJson]);
                    }
                }
            }
            newJson["metaData"]["count"] = newJson["specimens"].length;
            console.log(newJson);
            return newJson;
        }
        else{
            return rawJson;
        }
    };

    changeType(type){
        this.type = type;
        this.jsonType = this.queryType[this.type];
        this.url = "http://api.antweb.org/v3.1/" + this.jsonType["type"] + "?";
        var jsonType = this.queryType[this.type];
    };

    getWithCache(map){
        if(this.cacheJson !== ""){
            this.getQueens(this.cacheJson);
            deleteMarkers(map);
            drawMarkersInMap(this.getJsonDate(this.cacheJson),map);
        }
    }

    dameConsulta(map){
        var myUrl = this.url;
        //this.getJsonDate();
        for(var key in this.options){
            // console.log(key, this.options[key]);
            // console.log(this.jsonType["parameters"]);

            if(jQuery.inArray(key,this.jsonType["parameters"]) != -1 && this.options[key] !== ""){
                console.log(key,this.jsonType[key]);
                myUrl += key + "=" + this.options[key] + "&";
            }
        }
        myUrl = myUrl.substr(0,myUrl.length-1);
        console.log(myUrl);
        var myResult;
        var Consulta;
        var self = this;
        Consulta = jQuery.get(myUrl, function (data) {//myResult = data;
//            console.log(myResult);
            self.cacheJson = data;
            deleteMarkers(map);
            drawMarkersInMap(self.getJsonDate(data), map);
        });
    };
}