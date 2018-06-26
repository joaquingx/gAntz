var markers = [];

function searchMarker(actMarkers, lat, lon){
    jQuery.each(actMarkers, function (i, element) {
        if( element._latlng.lat == lat  && element._latlng.lng == lon){
            return true;
        }
    });
    return false;
}

function deleteMarkers(map) {
    jQuery.each(markers, function (i,element) {
        map.removeLayer(element);
    });
    markers = [];
}

function drawMarkersInMap(rawJson, map) {
    var rawSize = rawJson["metaData"].count;
    for(var i = 0; i < rawSize ; ++i){
        var actLat = parseFloat(rawJson["specimens"][i].geo.coordinates.lat);
        var actLon = parseFloat(rawJson["specimens"][i].geo.coordinates.lon);
        if(!isNaN(actLat) && !isNaN(actLon) && !searchMarker(markers,actLat,actLon)) {
            console.log(actLat);
            console.log(actLon);
            var marker = L.marker([actLat, actLon]).addTo(map);
            var popupMessage = rawJson["specimens"][i].recordedBy;
            marker.bindPopup(popupMessage).openPopup();
            markers.push(marker);
        }
    }
}

