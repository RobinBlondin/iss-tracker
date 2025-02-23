let alt = "";
let lat = "";
let long = "";
let vel = "";
let marker = null;

getIssPosition();

var map = L.map('map', {
    worldCopyJump: false,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
}).fitBounds([[-60, -170], [85, 170]]);

map.setView([long, lat], 3.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    noWrap: true
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: 'icons/iss.png',
    iconSize: [50, 50]
});

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

            addMarker();
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

    marker = L.marker([lat, long], {icon: greenIcon}).addTo(map);
}

setInterval(updateISSPosition, 5000);



