# leaflet-challenge
1. Understanding the USGS and Earthquake Data
The USGS is responsible for studying natural hazards like earthquakes, volcanic activity, and more. They collect data globally on earthquakes, updated frequently. Your task is to take this data, specifically the earthquake data, and visualize it meaningfully using Leaflet, a popular JavaScript library for interactive maps.

2. Fetching the Earthquake Data
The USGS provides earthquake data through their GeoJSON feed. Here's how you can get the dataset:

Step-by-Step:
Visit the USGS GeoJSON Feed.

Select a dataset to visualize (e.g., All Earthquakes from the Past 7 Days). The data will be provided in GeoJSON format.



3. Using Leaflet to Create the Map
With your dataset URL, you can now use Leaflet to plot the earthquakes on an interactive map.

Basic Steps for Map Setup:
Setting up Leaflet: Create a basic HTML structure, include the Leaflet CSS and JS libraries, and initialize a map.

Fetching Data: Use the d3.json() function (from the D3.js library) to fetch the earthquake data from the GeoJSON URL.

Plotting Earthquakes: For each earthquake in the dataset:

The earthquake’s longitude and latitude will be used to position the markers on the map.
Use magnitude (found in feature.properties.mag) to determine the size of the marker.
Use depth (found as the third value in feature.geometry.coordinates) to determine the color of the marker.
4. Marker Customization
You need to reflect both the magnitude and depth of the earthquake using markers:

Magnitude: The size of the marker. Larger earthquakes have bigger markers. You can use feature.properties.mag for this.
Depth: The color of the marker. Deeper earthquakes should be darker in color. You can access the depth from feature.geometry.coordinates[2].
You can create a function to determine the color based on depth:

5. Adding Popups
Each marker should have a popup that provides more information when clicked. You can use the bindPopup() method in Leaflet to do this. The popup should include:

Location (feature.properties.place)
Magnitude (feature.properties.mag)
Depth (feature.geometry.coordinates[2])
Example:

6. Adding a Legend
To provide context for the color coding based on earthquake depth, add a legend to the map. Here's an example of how to add a simple legend in Leaflet:

7. Final Visualization
Once you've completed these steps, your map should:

Display markers for each earthquake, with marker size based on magnitude and color based on depth.
Include popups with more detailed information when a marker is clicked.
Have a legend explaining the colors that correspond to earthquake depth.

Summary of the Task:
Fetch earthquake data from the USGS GeoJSON feed.
Visualize it on a Leaflet map by plotting markers at the earthquake locations.
Customize the markers based on earthquake magnitude (size) and depth (color).
Add interactive popups to display additional earthquake information.
Add a legend to help users understand the meaning of the colors on the map.
This will provide the USGS with a helpful and interactive tool for visualizing their earthquake data, making it easier to educate the public and other stakeholders.


The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


Requirements
These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.

Map (60 points)
TileLayer loads without error (20 points)

Connects to geojson API using D3 without error (20 points)

Markers with size corresponding to earthquake magnitude (10 points)

A legend showing the depth and their corresponding color (10 points)

Data Points (40 points)
Data points scale with magnitude level (10 points)

Data points colors change with depth level (10 points)

Each point has a tooltip with the Magnitude, the location and depth (10 points)

All data points load in the correct locations (10 points)