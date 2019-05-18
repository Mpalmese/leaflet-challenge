var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Creating map object
var map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Conditionals for Color
function chooseColor(mag){

if (mag > 5) {
  return "red";
}
else if (mag > 4) {
  return "orange";
}
else if (mag > 3) {
  return "gold";
}
else if (mag > 2){
  return "yellow";
}
else if (mag > 1){
  return "green";
}
else {
  return "lightgreen";
}};

d3.json(url, function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        color: "black",
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 0.75,
        radius: feature.properties.mag * 5
      });
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
      + "<br><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  }).addTo(map);
});



