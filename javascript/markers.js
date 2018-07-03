var colorValue = Math.random() * 360;

var options = {
    color: '#000',
    weight: 1,
    fillColor: 'hsl(' + colorValue + ',100%,50%)',
    radius: 25,
    fillOpacity: 0.7,
    rotation: 0.0,
    position: {
        x: 0,
        y: 0
    },
    offset: 0,
    numberOfSides: 50,
    width: 10,
    // onEachRecord: function (layer,record) {
    //     var $html = $(L.HTMLUtils.buildTable(record));
    //
    //     layer.bindPopup($html.wrap('<div/>').parent().html(),{
    //         minWidth: 400,
    //         maxWidth: 400
    //     });
    // }
};


var markers = {};

function searchMarker(actMarkers, lat, lon){
    jQuery.each(actMarkers, function (i, element) {
        if( element._latlng.lat == lat  && element._latlng.lng == lon){
            return true;
        }
    });
    return false;
}

function deleteAllMarkers(map){
    for(var i in markers){
        // console.log(markers[i]);
        for(var j in markers[i]){
            map.removeLayer(markers[i][j]);
        }
        // map.removeLayer(markers[i][0]);
    }
    markers = {};
}

function deleteMarkers(map,country) {
    if(markers[country] !== undefined) {
        jQuery.each(markers[country], function (i, element) {
            map.removeLayer(element);
        });
    }
    // markers = [];
}


function drawMarkersInMapChart(rawJson,data,cOptions,map,e,country){
    options.data = data;
    options.chartOptions = cOptions;
    console.log(options);
    var barChartMarker = new L.CoxcombChartMarker(new L.LatLng(e.latlng.lat, e.latlng.lng), options);
    if(markers[country] === undefined)
        markers[country] = [];
    markers[country].push(barChartMarker);
    barChartMarker.addTo(map);
}

function drawMarkersInMapDetail(rawJson, map,country) {
    var rawSize = rawJson["metaData"].count;
    for(var i = 0; i < rawSize ; ++i){
        var actLat = parseFloat(rawJson["specimens"][i].geo.coordinates.lat);
        var actLon = parseFloat(rawJson["specimens"][i].geo.coordinates.lon);
        if(!isNaN(actLat) && !isNaN(actLon)) {
            console.log(actLat);
            console.log(actLon);
            var marker = L.marker([actLat, actLon]).addTo(map);
            var popupMessage = rawJson["specimens"][i].recordedBy;
            marker.bindPopup(popupMessage).openPopup();
            if(markers[country] === undefined)
                markers[country] = [];
            markers[country].push(marker);
        }
    }
}

