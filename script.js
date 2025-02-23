let alt = "";
let lat = "";
let long = "";
let vel = "";
let marker = null;
let firstFetch = true;
const duration = 1000;

getIssPosition();

var map = L.map('map', {
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
}).fitBounds([[-60, -170], [85, 170]]);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> & contributors',
    noWrap: true
}).addTo(map);

async function getIssPosition() {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544'
    
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json()

        if(json) {
            alt = await json.altitude;
            lat = await json.latitude;
            long = await json.longitude;
            vel = await json.velocity;

            if(firstFetch) {
                map.setView([lat, long], 3);
                addMarker();
                firstFetch = false;
            }
        } else {
            console.error("problem with Json format")
        }

    } catch(error) {
        console.error(error.message)
    }
       
}

async function updateISSPosition() {
    await getIssPosition();
    addMarker();
}

function addMarker() {
    if(marker) {
        marker.remove();
    }

    if(lat === "" || long === "") {
        return;
    }

    marker = L.circleMarker([lat, long], {
        color: 'white',
        fillColor: 'blue',
        fillOpacity: 0.7,
        radius: 10
    }).addTo(map);
}

setInterval(updateISSPosition, duration);



