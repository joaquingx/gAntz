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
        this.options = {"family":"", "genus": "", "country":"Peru", "limit":"", "coords" : "",
            "Georeferenced": "1", "radius" : "2", "bbox":"", "month": "", "caste" : "Queen"};
        this.cacheJson = {};
    };

    getJsonVoid() {
        return {"metaData": {"count": "0"} , "specimens" : [] };
    }

    // getQueens(rawJson){
    //     var newJson = this.getJsonVoid();
    //     for(var actJson in rawJson["specimens"]){
    //         if(rawJson["specimens"][actJson]["caste"] != ""){
    //             console.log("aca entra");
    //             console.log(rawJson["specimens"][actJson]["dateCollected"]);
    //         }
    //     }
    //     //newJson["metaData"]["count"] = newJson["specimens"].length;
    //     //console.log(newJson);
    //     return newJson;
    // }

    getJsonDate(rawJson){
        var newJson = this.getJsonVoid();
        if(this.options["month"] !== undefined){
            for(var actJson in rawJson["specimens"]){
                if(rawJson["specimens"][actJson]["dateCollectedStart"] != undefined){
                    // console.log(rawJson["specimens"][actJson]["dateCollectedStart"]);
                    var myDate = new Date(rawJson["specimens"][actJson]["dateCollectedStart"])
                    var month = myDate.getMonth();
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


    getChart(rawJson) {
        var freqMap = new Map();
        for(var actJson in rawJson["specimens"]){
            var specie = rawJson["specimens"][actJson]["scientificName"];
            if(freqMap.get(specie) === undefined)
                freqMap.set(specie, 1);
            else
                freqMap.set(specie, freqMap.get(specie) + 1);
        }

        freqMap[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        };

        var cnt  = 0;
        var data = {};
        var chartOptions = {};
        for (let [key, value] of freqMap) {
            if(cnt < 4){
                data[key] = value;
                if(cnt == 0) {
                    chartOptions[key] = {
                        fillColor: '#EDF8FB',
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                            return value.toFixed(2);
                        }
                    };
                }
                else if(cnt == 1){
                    chartOptions[key] =  {
                        fillColor: '#B2E2E2',
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                            return value.toFixed(2);
                        }
                    };
                }
                else if(cnt == 2){
                    chartOptions[key] ={
                        fillColor: '#66C2A4',
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                            return value.toFixed(2);
                        }
                    };
                }
                else{
                    chartOptions[key] = {
                        fillColor: '#238B45',
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                            return value.toFixed(2);
                        }
                    };
                }
            }
            cnt++;
        }
        console.log(data);
        console.log(chartOptions);
        return [data,chartOptions];
        // freqMap.forEach( function dameElementos(value, key, freqmap){
        //     console.log(`m[${key}] = ${value}`);
        // })
    };

    getWithCache(map,e){
        if(this.cacheJson[this.options["country"]] !== ""){
            var myOption = this.cacheJson[this.options["country"]][1];
            console.log("myoption es :" + myOption);
            deleteMarkers(map,this.options["country"]);
            // console.log(this.cacheJson);
            console.log(this.getJsonDate(this.cacheJson[this.options["country"]][0]));
            // console.log("averavar\n");
            if(myOption === 0){
                var chartGod = this.getChart(this.getJsonDate(this.cacheJson[this.options["country"]][0]));
                var chartData = chartGod[0];
                var chartOptions = chartGod[1];
                console.log("entre");
                drawMarkersInMapChart(this.getJsonDate(this.cacheJson[this.options["country"]][0]),chartData,chartOptions,map,e,this.options["country"]);
            }
            else if(myOption === 1){
                drawMarkersInMapDetail(this.getJsonDate(this.cacheJson[this.options["country"]][0]),map,this.options["country"]);
            }

        }
    }

    dameConsulta(map,e){
        console.log("este es el cache:" + this.cacheJson[this.options["country"]]);
        if(this.cacheJson[this.options["country"]] === undefined) {
            var myUrl = this.url;
            //this.getJsonDate();
            for (var key in this.options) {
                if (jQuery.inArray(key, this.jsonType["parameters"]) != -1 && this.options[key] !== "") {
                    console.log(key, this.jsonType[key]);
                    myUrl += key + "=" + this.options[key] + "&";
                }
            }
            myUrl = myUrl.substr(0, myUrl.length - 1);
            console.log(myUrl);
            var Consulta;
            var self = this;
            Consulta = jQuery.get(myUrl, function (data) {//myResult = data;
                console.log(data);
                self.cacheJson[self.options["country"]] = [data,0];
                console.log(self.cacheJson[self.options["country"]]);
                self.getWithCache(map, e);
            });
        }
        else{
            console.log("Entre a la cache");
            this.cacheJson[this.options["country"]] = [this.cacheJson[this.options["country"]][0],
                1-this.cacheJson[this.options["country"]][1]];
            this.getWithCache(map,e);
        }
    };
}