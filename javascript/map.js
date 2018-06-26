var mymap = L.map('mapid').setView([-12.0432,-77.0282], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1Ijoiam9hcXVpbmdjIiwiYSI6ImNqaHd5M3F2aDA2MXQzcXBkZ2YweHV6cDcifQ._MFYWngP9cXULh4OQd3NWA'
}).addTo(mymap);

var q = new Query(0);

function changeFunc(id){
    countrySelected = document.getElementById(id).value;
    q.options[id] = countrySelected;
    q.getWithCache(mymap);
    console.log(q.options);
}
var popup = L.popup();

function onMapClick(e) {
    //q.changeType(1);
    var radio = 1.0;
    q.options["country"] = "";
    q.options["bbox"] = (e.latlng.lat + radio) + "," + (e.latlng.lng + radio) + ","+
        + (e.latlng.lat - radio) + "," + (e.latlng.lng - radio) + ","
        ;
    console.log(q.options);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    q.dameConsulta(mymap);
}
mymap.on('click',onMapClick);


function dameQuery(){
    q.options["bbox"] = "";
    q.changeType(0);
    q.dameConsulta(mymap);
}