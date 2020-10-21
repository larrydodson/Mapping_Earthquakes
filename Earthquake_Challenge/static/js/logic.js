// To check if code is working.
console.log("working");

// Create the tile layer that will be the default background of our map.
// Map Tile layer, Mapbox Streets v11 from Static Tiles API as mapbox/streets-v11, also mapbox/satellite-v9
//    for other styles see https://docs.mapbox.com/api/maps/#styles, also navigation-preview-night-v4
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Adding a 2nd map, using Leaflet Layers Control.
// Create the dark view tile layer that will be an option for the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center of Toronto, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
//let airportData = "https:/ / raw.githubusercontent.com / larrydodson / Mapping_Earthquakes / main / majorAirports.json ";

// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/larrydodson/Mapping_Earthquakes/main/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/larrydodson/Mapping_Earthquakes/main/torontoNeighborhoods.json";


// Grabbing the GeoJSON data, Airports.
//d3.json(airportData).then(function(data) {
//console.log(data);
// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data, {
//style: function(feature) {
//return { color: feature.properties.color };
//}
//}).bindPopup(function(layer) {
//return layer.feature.properties.description;
//return ("<h3>Airport code: " + layer.feature.properties.faa + " </h3> <hr> <h3>Airport name: " + layer.feature.properties.name + "</h3>");
//}).addTo(map);
//});

//Create a style for the lines, for Ailine Routes.
//let myStyle = {
//color: "#ffffa1",
//weight: 2
//}

// Grabbing the GeoJSON data, Airline Routes.
//d3.json(torontoData).then(function(data) {
//console.log(data);
// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data, {
//style: myStyle,
//onEachFeature: function(feature, layer) {
//layer.bindPopup("<h3>Airline: " + layer.feature.properties.airline + " </hr3> < hr > < h3 > Destination: " + layer.feature.properties.dst + " < /h3>")
//}
//}).addTo(map);
//});

// Create a style for the lines, for Neighbohoods. 
let myStyle = {
    color: "#3388ff",
    fillColor: "#ffffa1",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.3,

}

// Grabbing the GeoJSON data, Neighborhoods.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Neighborhood: " + layer.feature.properties.AREA_NAME + "</h3>")
        }
    }).addTo(map);
});