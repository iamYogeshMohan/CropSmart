// Map State
let map;
let marker;
let selectedLat = null;
let selectedLng = null;

// Initialize Map
function initMap() {
    // Center of India as initial view
    map = L.map('map').setView([20.59, 78.96], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Add Search Control
    if (L.Control.Geocoder) {
        L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on('markgeocode', function (e) {
                const bbox = e.geocode.bbox;
                const poly = L.polygon([
                    bbox.getSouthEast(),
                    bbox.getNorthEast(),
                    bbox.getNorthWest(),
                    bbox.getSouthWest()
                ]);
                map.fitBounds(poly.getBounds());

                // Set marker at center of result
                setMarker(e.geocode.center.lat, e.geocode.center.lng);
            })
            .addTo(map);
    }

    // Click Event to Select Location
    map.on('click', function (e) {
        setMarker(e.latlng.lat, e.latlng.lng);
    });

    // Try detecting initially
    // detectLocation(); // Optional: Auto-detect on load
}

function setMarker(lat, lng) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);
    selectedLat = lat;
    selectedLng = lng;

    updateLocationText(lat, lng);

    // Auto-Trigger Recommendations
    if (typeof getRecs === 'function') {
        getRecs(lat, lng);
    }
}

function updateLocationText(lat, lng) {
    document.getElementById('location-text').innerText = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

    // Mock Zone Detection
    let zone = "Moderate Region";
    if (lat > 22) zone = "Dry / Semi-Arid Region";
    else if (lat < 16) zone = "High Rainfall / Tropical Region";

    document.getElementById('zone-text').innerText = `Detected Zone: ${zone}`;
}

// Detect User Location Button
function detectLocation() {
    const statusText = document.getElementById('location-text');
    statusText.innerText = "Locating...";

    if (!navigator.geolocation) {
        statusText.innerText = "Geolocation not supported";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            map.setView([lat, lng], 10);
            setMarker(lat, lng);
        },
        () => {
            statusText.innerText = "Location access denied";
        }
    );
}

document.addEventListener('DOMContentLoaded', initMap);
