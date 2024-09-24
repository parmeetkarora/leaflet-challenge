// URL for earthquake data (past week)
let earthquakeurl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Make call to the earthquake data URL
d3.json(earthquakeurl).then(function (data) {
  createData(data.features);
});

// Set initial map coordinates and zoom level
let mapCoords = [40.09, -105.71];
let mapZoomLevel = 5;

// Function to create the map with layers
function createMap(earthquakes) {
  // Create the base layer (street view)
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Base map object
  let baseMaps = {
    "Street Map": street
  };

  // Overlay object containing the earthquake layer
  let overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map with initial layers
  let myMap = L.map("map", {
    center: mapCoords,
    zoom: mapZoomLevel,
    layers: [street, earthquakes]
  });

  // Create a legend for the map
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h4>Depth (km)</h4>';
    div.innerHTML += '<i style="background: rgb(163,246,0)"></i> -10 - 10<br>';
    div.innerHTML += '<i style="background: rgb(220,244,0)"></i> 10 - 30<br>';
    div.innerHTML += '<i style="background: rgb(247,219,17)"></i> 30 - 50<br>';
    div.innerHTML += '<i style="background: rgb(253,183,42)"></i> 50 - 70<br>';
    div.innerHTML += '<i style="background: rgb(252,163,93)"></i> 70 - 90<br>';
    div.innerHTML += '<i style="background: rgb(255,95,101)"></i> 90+<br>';
    return div;
  };

  // Add the legend to the map
  legend.addTo(myMap);
}

// Function to create earthquake markers and add them to the map
function createData(eqData) {
  let earthquakes = [];
  for (let i = 0; i < eqData.length; i++) {
    let lat = eqData[i].geometry.coordinates[1];
    let long = eqData[i].geometry.coordinates[0];
    let entry = L.circle([lat, long], {
      stroke: true,
      fillOpacity: 1,
      weight: 1,
      color: 'black',
      fillColor: eqColor(eqData[i].geometry.coordinates[2]), // Depth-based color
      radius: eqData[i].properties.mag * 17500 // Magnitude-based radius
    });

    // Add popup for each earthquake
    entry.bindPopup(`<h3>${eqData[i].properties.place}</h3>
                     <p>Depth: ${eqData[i].geometry.coordinates[2]} km<br>
                     Magnitude: ${eqData[i].properties.mag}<br>
                     Time: ${new Date(eqData[i].properties.time)}</p>`);

    earthquakes.push(entry);
  }

  // Create layer group for earthquake markers
  let earthquakeLayer = L.layerGroup(earthquakes);

  // Call createMap function with the earthquake layer
  createMap(earthquakeLayer);
}

// Function to return color based on earthquake depth
function eqColor(depth) {
  if (depth > 90) {
    return 'rgb(255,95,101)';
  } else if (depth > 70) {
    return 'rgb(252,163,93)';
  } else if (depth > 50) {
    return 'rgb(253,183,42)';
  } else if (depth > 30) {
    return 'rgb(247,219,17)';
  } else if (depth > 10) {
    return 'rgb(220,244,0)';
  } else {
    return 'rgb(163,246,0)';
  }
}
