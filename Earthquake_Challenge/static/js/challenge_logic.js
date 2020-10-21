// Earthquake Challenge Module 13. 
// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be a background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the second tile layer that will be a background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the third tile layer that will be a background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
// Marshall Islands: 10.1038195,168.728363  Center of US: 40.7 -94.5  Austin: 30.27 -97.74
let map = L.map('mapid', {
    center: [30.27, -97.74],
    zoom: 3,
    layers: [satelliteStreets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark": dark
};

// 1. Add data for three layer groups: all, tectonic plates, majoreq.
let tectonicPlates = new L.LayerGroup();
let allEarthquakes = new L.LayerGroup();
let majorEQ = new L.LayerGroup();

// 2. Add three reference groups to the overlays object.
let overlays = {
    "Tectonic Plates": tectonicPlates,
    "Earthquakes": allEarthquakes,
    "Major Earthquakes ≥4.5": majorEQ
};

// Add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into two separate functions
    // to calculate the color and radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and location of the earthquake
        //  after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(allEarthquakes);

    // Then we add the earthquake layer to our map.
    allEarthquakes.addTo(map);


    // Adding Major Earthquakes of >= 4.5 data, Past 7 Days.
    // Retrieve the earthquake GeoJSON data.
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

        // This function returns the style data for each of the major earthquakes we plot on
        // the map. We pass the magnitude of the earthquake into two separate functions
        // to calculate the color and radius.
        function styleInfo(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.properties.mag),
                color: "#00ff00",
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 3.5
            };
        }

        // This function determines the color of the marker based on the magnitude of the earthquake.
        function getColor(magnitude) {
            if (magnitude > 5) {
                return "#ea2c2c";
            }
            if (magnitude > 4) {
                return "#ea822c";
            }
            if (magnitude < 4) {
                return "#ee9c00";
            }
            //if (magnitude > 2) {
            //return "#eecc00";
            //}
            //if (magnitude > 1) {
            //return "#d4ee00";
            //}
            //return "#98ee00";
        }

        // This function determines the radius of the earthquake marker based on its magnitude.
        // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
        function getRadius(magnitude) {
            if (magnitude === 0) {
                return 1;
            }
            return magnitude * 4;
        }

        // Creating a GeoJSON layer with the retrieved data.
        L.geoJson(data, {
            // We turn each feature into a circleMarker on the map.
            pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
            // We set the style for each circleMarker using our styleInfo function.
            style: styleInfo,
            // We create a popup for each circleMarker to display the magnitude and location of the earthquake
            //  after the marker has been created and styled.
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
            }
        }).addTo(majorEQ);

        // Then we add the earthquake layer to our map.
        majorEQ.addTo(map);
    });


    // Here we create a legend control object.
    let legend = L.control({
        position: "bottomright"
    });

    // Then add all the details for the legend
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");

        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;
    };

    // Finally, we our legend to the map.
    legend.addTo(map);

    // Create a style for the lines, for Tectonic Plates. 
    let myStyle = {
        color: "#cc6600",
        //fillColor: "#ffffa1",
        weight: 3,
        opacity: 1,
        //fillOpacity: 0.3,
    }

    // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
    //    or this  https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
        // Creating a GeoJSON layer with the retrieved data.
        L.geoJson(data, {
            style: myStyle,
        }).addTo(tectonicPlates);

        // Add the tectonic plates layer to the map.
        tectonicPlates.addTo(map);
    });

});