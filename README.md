# ISS Tracker with Leaflet.js

This small project fetches the real-time coordinates of the **International Space Station (ISS)** and displays its live position on a **Leaflet.js** map. The map updates automatically as the ISS moves across the Earth.

## Features
-  **Fetches real-time ISS coordinates** from an API
-  **Displays ISS position** on a Leaflet.js map
-  **Updates position dynamically** as the ISS moves

## Usage
Clone this repository.
Open index.html in a browser or use the live server extension in Vscode.
Watch the ISS move across the map in real-time! 

## How It Works
The project fetches ISS coordinates from the whertheissat API ([http://api.open-notify.org/iss-now.json](https://api.wheretheiss.at/v1/satellites/25544)).
The ISS position is updated on a Leaflet.js map every few seconds.
## API Used
[Wheretheissat](https://wheretheiss.at/w/developer)
