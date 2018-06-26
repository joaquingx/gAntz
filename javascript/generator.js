function getJsonDate(rawJson){
    var newJson = {"metaData": {"count": "0"} , "specimens" : [] };
    var dateMapeo = {
        0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0
    };
    var cnt = 0;
    console.log(rawJson["metaData"]["parameters"][0]["country"]);
    for(var actJson in rawJson["specimens"]) {
        if(rawJson["specimens"][actJson]["dateCollectedStart"] != undefined) {
            var myDate = new Date(rawJson["specimens"][actJson]["dateCollectedStart"]);
            console.log(myDate);
            var month = myDate.getMonth();
            dateMapeo[month] = dateMapeo[month] + 1;
            cnt++;
        }
    }
    return [dateMapeo,cnt];
};


countrys = [
    ["Aruba" , "ABW"],
    ["Afghanistan" , "AFG"],
    ["Angola" , "AGO"],
    ["Anguilla" , "AIA"],
    ["Åland" , "ALA"],
    ["Albania" , "ALB"],
    ["Andorra" , "AND"],
    ["United" , "ARE"],
    ["Argentina" , "ARG"],
    ["Armenia" , "ARM"],
    ["American" , "ASM"],
    ["Antarctica" , "ATA"],
    ["French" , "ATF"],
    ["Antigua" , "ATG"],
    ["Australia" , "AUS"],
    ["Austria" , "AUT"],
    ["Azerbaijan" , "AZE"],
    ["Burundi" , "BDI"],
    ["Belgium" , "BEL"],
    ["Benin" , "BEN"],
    ["Bonaire" , "BES"],
    ["Burkina" , "BFA"],
    ["Bangladesh" , "BGD"],
    ["Bulgaria" , "BGR"],
    ["Bahrain" , "BHR"],
    ["Bahamas" , "BHS"],
    ["Bosnia" , "BIH"],
    ["Saint" , "BLM"],
    ["Belarus" , "BLR"],
    ["Belize" , "BLZ"],
    ["Bermuda" , "BMU"],
    ["Bolivia" , "BOL"],
    ["Brazil" , "BRA"],
    ["Barbados" , "BRB"],
    ["Brunei" , "BRN"],
    ["Bhutan" , "BTN"],
    ["Bouvet" , "BVT"],
    ["Botswana" , "BWA"],
    ["Central African Republic" , "CAF"],
    ["Canada" , "CAN"],
    ["Cocos" , "CCK"],
    ["Switzerland" , "CHE"],
    ["Chile" , "CHL"],
    ["China" , "CHN"],
    ["Côte" , "CIV"],
    ["Cameroon" , "CMR"],
    ["Congo" , "COG"],
    ["Cook" , "COK"],
    ["Colombia" , "COL"],
    ["Comoros" , "COM"],
    ["Cabo" , "CPV"],
    ["Costa" , "CRI"],
    ["Cuba" , "CUB"],
    ["Curaçao" , "CUW"],
    ["Christmas" , "CXR"],
    ["Cayman" , "CYM"],
    ["Cyprus" , "CYP"],
    ["Czechia" , "CZE"],
    ["Germany" , "DEU"],
    ["Djibouti" , "DJI"],
    ["Dominica" , "DMA"],
    ["Denmark" , "DNK"],
    ["Dominican" , "DOM"],
    ["Algeria" , "DZA"],
    ["Ecuador" , "ECU"],
    ["Egypt" , "EGY"],
    ["Eritrea" , "ERI"],
    ["Western" , "ESH"],
    ["Spain" , "ESP"],
    ["Estonia" , "EST"],
    ["Ethiopia" , "ETH"],
    ["Finland" , "FIN"],
    ["Fiji" , "FJI"],
    ["Falkland" , "FLK"],
    ["France" , "FRA"],
    ["Faroe" , "FRO"],
    ["Micronesia" , "FSM"],
    ["Gabon" , "GAB"],
    ["United" , "GBR"],
    ["Georgia" , "GEO"],
    ["Guernsey" , "GGY"],
    ["Ghana" , "GHA"],
    ["Gibraltar" , "GIB"],
    ["Guinea" , "GIN"],
    ["Guadeloupe" , "GLP"],
    ["Gambia" , "GMB"],
    ["Guinea-Bissau" , "GNB"],
    ["Equatorial" , "GNQ"],
    ["Greece" , "GRC"],
    ["Grenada" , "GRD"],
    ["Greenland" , "GRL"],
    ["Guatemala" , "GTM"],
    ["French" , "GUF"],
    ["Guam" , "GUM"],
    ["Guyana" , "GUY"],
    ["Hong" , "HKG"],
    ["Heard" , "HMD"],
    ["Honduras" , "HND"],
    ["Croatia" , "HRV"],
    ["Haiti" , "HTI"],
    ["Hungary" , "HUN"],
    ["Indonesia" , "IDN"],
    ["Isle" , "IMN"],
    ["India" , "IND"],
    ["British" , "IOT"],
    ["Ireland" , "IRL"],
    ["Iran" , "IRN"],
    ["Iraq" , "IRQ"],
    ["Iceland" , "ISL"],
    ["Israel" , "ISR"],
    ["Italy" , "ITA"],
    ["Jamaica" , "JAM"],
    ["Jersey" , "JEY"],
    ["Jordan" , "JOR"],
    ["Japan" , "JPN"],
    ["Kazakhstan" , "KAZ"],
    ["Kenya" , "KEN"],
    ["Kyrgyzstan" , "KGZ"],
    ["Cambodia" , "KHM"],
    ["Kiribati" , "KIR"],
    ["Saint" , "KNA"],
    ["Korea" , "KOR"],
    ["Kuwait" , "KWT"],
    ["Lao" , "LAO"],
    ["Lebanon" , "LBN"],
    ["Liberia" , "LBR"],
    ["Libya" , "LBY"],
    ["Saint" , "LCA"],
    ["Liechtenstein" , "LIE"],
    ["Sri" , "LKA"],
    ["Lesotho" , "LSO"],
    ["Lithuania" , "LTU"],
    ["Luxembourg" , "LUX"],
    ["Latvia" , "LVA"],
    ["Macao" , "MAC"],
    ["Saint" , "MAF"],
    ["Morocco" , "MAR"],
    ["Monaco" , "MCO"],
    ["Moldova" , "MDA"],
    ["Madagascar" , "MDG"],
    ["Maldives" , "MDV"],
    ["Mexico" , "MEX"],
    ["Marshall" , "MHL"],
    ["Macedonia" , "MKD"],
    ["Mali" , "MLI"],
    ["Malta" , "MLT"],
    ["Myanmar" , "MMR"],
    ["Montenegro" , "MNE"],
    ["Mongolia" , "MNG"],
    ["Northern" , "MNP"],
    ["Mozambique" , "MOZ"],
    ["Mauritania" , "MRT"],
    ["Montserrat" , "MSR"],
    ["Martinique" , "MTQ"],
    ["Mauritius" , "MUS"],
    ["Malawi" , "MWI"],
    ["Malaysia" , "MYS"],
    ["Mayotte" , "MYT"],
    ["Namibia" , "NAM"],
    ["New" , "NCL"],
    ["Niger" , "NER"],
    ["Norfolk" , "NFK"],
    ["Nigeria" , "NGA"],
    ["Nicaragua" , "NIC"],
    ["Niue" , "NIU"],
    ["Netherlands" , "NLD"],
    ["Norway" , "NOR"],
    ["Nepal" , "NPL"],
    ["Nauru" , "NRU"],
    ["New" , "NZL"],
    ["Oman" , "OMN"],
    ["Pakistan" , "PAK"],
    ["Panama" , "PAN"],
    ["Pitcairn" , "PCN"],
    ["Peru" , "PER"],
    ["Philippines" , "PHL"],
    ["Palau" , "PLW"],
    ["Papua" , "PNG"],
    ["Poland" , "POL"],
    ["Puerto" , "PRI"],
    ["Korea" , "PRK"],
    ["Portugal" , "PRT"],
    ["Paraguay" , "PRY"],
    ["Palestine" , "PSE"],
    ["French" , "PYF"],
    ["Qatar" , "QAT"],
    ["Réunion" , "REU"],
    ["Romania" , "ROU"],
    ["Russia" , "RUS"],
    ["Rwanda" , "RWA"],
    ["Saudi" , "SAU"],
    ["Sudan" , "SDN"],
    ["Senegal" , "SEN"],
    ["Singapore" , "SGP"],
    ["South" , "SGS"],
    ["Saint" , "SHN"],
    ["Svalbard" , "SJM"],
    ["Solomon" , "SLB"],
    ["Sierra" , "SLE"],
    ["El" , "SLV"],
    ["San" , "SMR"],
    ["Somalia" , "SOM"],
    ["Saint" , "SPM"],
    ["Serbia" , "SRB"],
    ["South" , "SSD"],
    ["Sao" , "STP"],
    ["Suriname" , "SUR"],
    ["Slovakia" , "SVK"],
    ["Slovenia" , "SVN"],
    ["Sweden" , "SWE"],
    ["Swaziland" , "SWZ"],
    ["Sint" , "SXM"],
    ["Seychelles" , "SYC"],
    ["Syrian" , "SYR"],
    ["Turks" , "TCA"],
    ["Chad" , "TCD"],
    ["Togo" , "TGO"],
    ["Thailand" , "THA"],
    ["Tajikistan" , "TJK"],
    ["Tokelau" , "TKL"],
    ["Turkmenistan" , "TKM"],
    ["Timor-Leste" , "TLS"],
    ["Tonga" , "TON"],
    ["Trinidad" , "TTO"],
    ["Tunisia" , "TUN"],
    ["Turkey" , "TUR"],
    ["Tuvalu" , "TUV"],
    ["Taiwan" , "TWN"],
    ["Tanzania" , "TZA"],
    ["Uganda" , "UGA"],
    ["Ukraine" , "UKR"],
    ["United" , "UMI"],
    ["Uruguay" , "URY"],
    ["United" , "USA"],
    ["Uzbekistan" , "UZB"],
    ["Holy" , "VAT"],
    ["Saint" , "VCT"],
    ["Venezuel" , "VEN"],
    ["Virgin" , "VGB"],
    ["Virgin" , "VIR"],
    ["Viet" , "VNM"],
    ["Vanuatu" , "VUT"],
    ["Wallis" , "WLF"],
    ["Samoa" , "WSM"],
    ["Yemen" , "YEM"],
    ["South" , "ZAF"],
    ["Zambia" , "ZMB"],
    ["Zimbabwe" , "ZWE"]
];

url = "http://api.antweb.org/v3.1/specimens?caste=queen&country=";

var antData = [ {"countrys":{}} ,{"countrys":{}}, {"countrys":{}}, {"countrys":{}}, {"countrys":{}}, {"countrys":{}},
    {"countrys":{}}, {"countrys":{}}, {"countrys":{}}, {"countrys":{}} ,{"countrys":{}} ,{"countrys":{}}];


function giveMonthFreq(){
    for (var country in countrys){
        myUrl = url + countrys[country][0];
        console.log(myUrl);
        jQuery.ajaxSetup({
            async:false
        });
        Consulta = jQuery.get(myUrl, function (data) {//myResult = data;
            myDates = getJsonDate(data);
            thisDates = myDates[0];
            thisTotal = myDates[1];
            thisCountry = data["metaData"]["parameters"][0]["country"];
            for (var index = 0; index < antData.length; index++){
                // console.log(index);
                antData[index]["countrys"][thisCountry] = {"name" : thisCountry, "qty": thisDates[index]
                    , "abbr" : countrys[country][1], "total" : thisTotal};
            }
            // document.write(JSON.stringify(antData));
            // document.write("MACHIKAMACHIKAMACHIKA\n\n\n\n");
        });
    }
    return antData;
}

function printMonthFreq(){
    giveMonthFreq();
    console.log("AQUITA");
    console.log(antData);
    document.write(JSON.stringify(antData));
    // giveMonthFreq( function()
    //
    // )
}
printMonthFreq();





