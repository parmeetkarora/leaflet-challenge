// Create the map and set the initial view
const map = L.map('map').setView([20, 0], 2);  // Latitude, Longitude, Zoom level

// Add a base tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Define URLs for earthquake and tectonic plates data
const earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
const tectonicPlatesURL = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';

// Create layer groups for earthquakes and tectonic plates
const earthquakeLayer = L.layerGroup().addTo(map);
const tectonicPlatesLayer = L.layerGroup().addTo(map);

// Function to add earthquake data to the map
function addEarthquakeData() {
    d3.json(earthquakeURL).then(data => {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                const magnitude = feature.properties.mag;
                const color = magnitude > 5 ? 'red' : magnitude > 3 ? 'orange' : 'yellow';
                return L.circleMarker(latlng, {
                    radius: magnitude * 3,
                    fillColor: color,
                    color: 'white',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).bindPopup(`Magnitude: ${magnitude}<br>Location: ${feature.properties.place}`);
            }
        }).addTo(earthquakeLayer);
    });
}

// Function to add tectonic plates data to the map
function addTectonicPlatesData() {
    d3.json(tectonicPlatesURL).then(data => {
        L.geoJson(data, {
            style: {
                color: 'blue',
                weight: 2
            }
        }).addTo(tectonicPlatesLayer);
    });
}

// Add data to the respective layers
addEarthquakeData();
addTectonicPlatesData();

// Layer control
const overlays = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicPlatesLayer
};

L.control.layers(null, overlays).addTo(map);
