// Extended Crop Database with strict requirements
const cropsDB = [
    {
        id: 'cotton',
        name: 'Cotton',
        image: 'assets/cotton.png',
        season: 'Kharif',
        sowing: 'June - July',
        desc: 'Significant cash crop. Requires black soil and warm climate.',
        pest: 'Bollworm',
        req: {
            soil: ['black', 'alluvial'],
            rain: ['low', 'medium'], // Cotton hates too much rain
            temp: ['moderate', 'high']
        }
    },
    {
        id: 'rice',
        name: 'Rice (Paddy)',
        image: 'assets/rice.png',
        season: 'Kharif',
        sowing: 'June - August',
        desc: 'Staple food crop. Needs standing water.',
        pest: 'Stem Borer',
        req: {
            soil: ['clay', 'loamy', 'alluvial'],
            rain: ['high'],
            temp: ['moderate', 'high']
        }
    },
    {
        id: 'wheat',
        name: 'Wheat',
        image: 'assets/wheat.png',
        season: 'Rabi',
        sowing: 'November',
        desc: 'Major cereal crop. Needs cool winter.',
        pest: 'Rust',
        req: {
            soil: ['loamy', 'alluvial'],
            rain: ['low', 'medium'],
            temp: ['low', 'moderate']
        }
    },
    {
        id: 'maize',
        name: 'Maize (Corn)',
        image: 'assets/maize.png',
        season: 'Kharif/Rabi',
        sowing: 'Anytime',
        desc: 'Versatile crop. Good drainage required.',
        pest: 'Fall Armyworm',
        req: {
            soil: ['black', 'loamy', 'red'],
            rain: ['medium', 'high'],
            temp: ['moderate', 'high']
        }
    },
    {
        id: 'sugarcane',
        name: 'Sugarcane',
        image: 'assets/sugarcane.png',
        season: 'Annual',
        sowing: 'January - March',
        desc: 'Long duration crop. Water intensive.',
        pest: 'Red Rot',
        req: {
            soil: ['black', 'loamy'],
            rain: ['medium', 'high'],
            temp: ['high']
        }
    },
    {
        id: 'groundnut',
        name: 'Groundnut',
        image: 'assets/groundnut.png',
        season: 'Kharif',
        sowing: 'June - July',
        desc: 'Oilseed crop. Prefers light soil.',
        pest: 'Leaf Miner',
        req: {
            soil: ['sandy', 'loamy', 'red'],
            rain: ['low', 'medium'],
            temp: ['high']
        }
    },
    {
        id: 'mustard',
        name: 'Mustard',
        image: 'assets/mustard.png',
        season: 'Rabi',
        sowing: 'October',
        desc: 'Major oilseed. Needs cool climate.',
        pest: 'Aphids',
        req: {
            soil: ['loamy', 'sandy'],
            rain: ['low'],
            temp: ['low', 'moderate']
        }
    }
];

// Global state to store last location
let lastLat = 20.59;
let lastLng = 78.96;

function getRecs(lat, lng, soilOverride = null) {
    // Store location for manual updates
    if (lat && lng) {
        lastLat = lat;
        lastLng = lng;
    } else {
        // Use stored location if not provided (e.g., manual update)
        lat = lastLat;
        lng = lastLng;
    }

    // Reveal section
    const recSection = document.getElementById('recommendation-section');
    recSection.style.display = 'block';

    // UI Elements
    const grid = document.getElementById('crop-grid');
    const banner = document.getElementById('conditions-banner');

    // Loader
    grid.innerHTML = '<p style="text-align:center; width:100%; color:#666;"><i class="fas fa-spinner fa-spin"></i> Analyzing soil, weather, and climate data...</p>';
    // banner.style.display = 'none'; // Keep banner visible during update for better UX

    setTimeout(() => {
        grid.innerHTML = ''; // Clear loader

        // 1. Detect Environment (Simulated AI)
        const conditions = inferConditions(lat, lng);

        // Apply Override if exists
        if (soilOverride) {
            conditions.soil = soilOverride;
        }

        // 2. Display Analysis
        banner.style.display = 'block';
        document.getElementById('res-soil').innerText = conditions.soil.charAt(0).toUpperCase() + conditions.soil.slice(1);
        document.getElementById('res-rain').innerText = conditions.rain.toUpperCase();
        document.getElementById('res-temp').innerText = conditions.tempVal; // Show Degrees

        // 3. Filter Crops (Matching Logic)
        const matchingCrops = cropsDB.filter(crop => {
            // Check if crop requirements overlap with detecting conditions
            const soilMatch = crop.req.soil.includes(conditions.soil) || crop.req.soil.includes('alluvial'); // Relaxed
            const rainMatch = crop.req.rain.includes(conditions.rain);
            const tempMatch = crop.req.temp.includes(conditions.temp); // Use Category for Logic

            // Return true if it's a good match
            return soilMatch && tempMatch && (rainMatch || conditions.rain === 'medium');
        });

        // 4. Render
        if (matchingCrops.length === 0) {
            grid.innerHTML = '<p style="text-align:center; width:100%; color:#d9534f;">No specific crops found perfectly matching these conditions. Try adjusting the soil type again.</p>';
            return;
        }

        matchingCrops.forEach(crop => {
            const card = document.createElement('div');
            card.className = 'crop-card';
            card.onclick = () => showCropDetails(crop.id);

            // Calculate "Match Score" for badge
            let matchType = 'Highly Suitable';
            let badgeClass = 'tag-high';

            if (!crop.req.rain.includes(conditions.rain)) {
                matchType = 'Suitable'; // Rainfall mismatch but accepted via relaxed logic
                badgeClass = 'tag-med';
            }

            card.innerHTML = `
                <img src="${crop.image}" alt="${crop.name}" class="crop-img">
                <div class="crop-info">
                    <h4>${crop.name}</h4>
                    <span class="tag ${badgeClass}">${matchType}</span>
                    <p style="margin-top:0.5rem; font-size:0.9rem; color:#666;">
                        <i class="fas fa-cloud-sun"></i> ${crop.season}
                    </p>
                </div>
            `;
            grid.appendChild(card);
        });

        recSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }, 800);
}

// Logic Simulation based on India's Geography
function inferConditions(lat, lng) {
    let soil = 'loamy';
    let rain = 'medium';
    let temp = 'moderate';
    let tempVal = '25-30°C';

    // North (Punjab, Rajasthan, UP)
    if (lat > 24) {
        temp = 'low'; // Assuming Winter/Rabi context
        tempVal = '10-20°C';
        if (lng < 76) { // Rajasthan
            soil = 'sandy';
            rain = 'low';
            temp = 'high'; // Hot desert
            tempVal = '35-42°C';
        } else { // Punjab/UP
            soil = 'loamy'; // alluvial simplified
            rain = 'medium';
        }
    }
    // Central/West (Maharashtra, MP, Gujarat)
    else if (lat > 16 && lat <= 24) {
        temp = 'high';
        tempVal = '28-35°C';
        if (lng < 74) { // Coastal/Gujarat
            soil = 'black';
            rain = 'medium';
        } else { // Interior
            soil = 'black';
            rain = 'medium';
        }
    }
    // South (Karnataka, TN, Kerala, AP)
    else {
        temp = 'high';
        tempVal = '30-36°C'; // Tropical
        soil = 'red';
        if (lng < 77) { // Kerala/West Coast
            soil = 'clay';
            rain = 'high';
            tempVal = '26-32°C'; // Humid
        } else { // TN/AP
            soil = 'red';
            rain = 'medium';
        }
    }

    return { soil, rain, temp, tempVal };
}

// Function called by the Quick Soil Check button
function updateRecs() {
    const soilSelect = document.getElementById('soil-type');
    const selectedSoil = soilSelect.value;

    if (selectedSoil) {
        // Re-run recommendations with the selected soil
        getRecs(null, null, selectedSoil);
    }
}

// Modal Logic
const modal = document.getElementById('crop-modal');
const closeBtn = document.querySelector('.close-modal');
if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

function showCropDetails(id) {
    const crop = cropsDB.find(c => c.id === id);
    if (!crop) return;

    const body = document.getElementById('modal-body');
    body.innerHTML = `
        <div class="modal-header">
            <img src="${crop.image}" class="modal-hero-img">
        </div>
        <div class="modal-body-content">
            <h2 style="color:var(--primary-color); margin-bottom:1rem;">${crop.name}</h2>
            <p style="font-size:1.1rem; margin-bottom:1.5rem;">${crop.desc}</p>
            
            <div class="detail-row"><i class="fas fa-calendar-check"></i> <strong>Sowing:</strong>&nbsp;${crop.sowing}</div>
            <div class="detail-row"><i class="fas fa-tint"></i> <strong>Water:</strong>&nbsp;${crop.req.rain.join('/')}</div>
            <div class="detail-row"><i class="fas fa-flask"></i> <strong>Soil Pref:</strong>&nbsp;${crop.req.soil.join('/')}</div>
            <div class="detail-row"><i class="fas fa-bug" style="color:red;"></i> <strong>Pest Risk:</strong>&nbsp;${crop.pest}</div>
            
            <button class="btn btn-primary" style="width:100%; margin-top:1rem;" onclick="modal.style.display='none'">Close</button>
        </div>
    `;
    modal.style.display = 'block';
}

// Function called by Soil Dropdown change
function updateSoilImage() {
    const soilSelect = document.getElementById('soil-type');
    const img = document.getElementById('current-soil-img');
    const val = soilSelect.value;

    if (val === 'black') img.src = 'assets/soil_black.png';
    else if (val === 'red') img.src = 'assets/soil_red.png';
    else if (val === 'clay') img.src = 'assets/soil_clay.png';
    else if (val === 'sandy') img.src = 'assets/soil_sandy.png';
    else img.src = 'assets/icon_soil.png'; // Default
}
