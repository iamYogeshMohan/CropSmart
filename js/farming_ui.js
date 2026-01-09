function initDashboard() {
    const grid = document.getElementById('crop-grid');
    if (!grid) return;

    // Render Crop Buttons
    Object.keys(cropData).forEach(key => {
        const crop = cropData[key];
        const btn = document.createElement('div');
        btn.className = 'crop-select-card';
        btn.innerHTML = `
            <img src="${crop.image}" alt="${crop.name}" onerror="this.src='assets/scan_icon.png'">
            <h3>${crop.name}</h3>
        `;
        btn.onclick = () => loadCropDetails(key);
        grid.appendChild(btn);
    });

    // Load default or query param crop
    const urlParams = new URLSearchParams(window.location.search);
    const cropParam = urlParams.get('crop');
    if (cropParam && cropData[cropParam]) {
        loadCropDetails(cropParam);
    }
}

function loadCropDetails(cropKey) {
    const crop = cropData[cropKey];
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('crop-selector').style.display = 'none';

    // Header
    document.getElementById('selected-crop-name').innerText = crop.name;
    document.getElementById('crop-img-main').src = crop.image;

    // Requirements
    document.getElementById('req-soil').innerText = crop.soil;
    document.getElementById('req-temp').innerText = crop.temp;
    document.getElementById('req-water').innerText = crop.water_req;

    // Advice
    document.getElementById('adv-irrigation').innerText = crop.irrigation;
    document.getElementById('adv-fertilizer-npk').innerText = crop.fertilizer.npk;
    document.getElementById('adv-fertilizer-org').innerText = crop.fertilizer.organic;
    document.getElementById('adv-tip').innerText = crop.fertilizer.tip;

    renderCalendar(crop.calendar);
    renderPests(crop.pests);
    renderMarket(crop.market);
    renderWeather(cropKey);
}

function renderCalendar(calendar) {
    const container = document.getElementById('calendar-timeline');
    container.innerHTML = '';

    calendar.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${step.stage}</h4>
                <span class="badg">${step.time}</span>
                <p>${step.task}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderPests(pests) {
    const container = document.getElementById('pest-container');
    container.innerHTML = '';

    pests.forEach(pest => {
        const div = document.createElement('div');
        div.className = 'pest-card';
        div.innerHTML = `
            <div class="pest-header">
                <h5>${pest.name}</h5>
                <span class="severity ${pest.severity.toLowerCase()}">${pest.severity}</span>
            </div>
            <p><strong>Solution:</strong> ${pest.solution}</p>
        `;
        container.appendChild(div);
    });
}

function renderMarket(market) {
    document.getElementById('mkt-price').innerText = market.current;
    document.getElementById('mkt-trend').innerText = market.trend;
    document.getElementById('mkt-predict').innerText = market.prediction;
}

function renderWeather(cropKey) {
    // Mock Weather and Alerts based on crop
    const alertBox = document.getElementById('dash-alert');
    let alertText = "";
    let alertClass = "alert-info";

    if (cropKey === 'rice') {
        alertText = "🌧️ Heavy Rain Alert: Maintain water level but ensure drainage if >20cm.";
        alertClass = "alert-warning";
    } else if (cropKey === 'wheat') {
        alertText = "❄️ Frost Alert: Risk of frost damage in early morning.";
        alertClass = "alert-danger";
    } else if (cropKey === 'sugarcane') {
        alertText = "🔥 Heat Wave Alert: Increase irrigation frequency.";
        alertClass = "alert-danger";
    } else {
        alertText = "✅ Weather Conditions are favorable for field work.";
        alertClass = "alert-success";
    }

    alertBox.className = `alert-banner ${alertClass}`;
    alertBox.innerHTML = alertText;

    // Render 5-Day Forecast
    const forecastContainer = document.getElementById('dash-forecast-container');
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
        const mockForecast = [
            { day: "Today", temp: 29, icon: "fas fa-sun" },
            { day: "Tomorrow", temp: 28, icon: "fas fa-cloud-sun" },
            { day: "Wed", temp: 27, icon: "fas fa-cloud-rain" },
            { day: "Thu", temp: 26, icon: "fas fa-cloud-showers-heavy" },
            { day: "Fri", temp: 28, icon: "fas fa-cloud" }
        ];

        mockForecast.forEach(d => {
            const div = document.createElement('div');
            div.className = 'forecast-card';
            div.innerHTML = `
                <div class="f-day">${d.day}</div>
                <div class="f-icon"><i class="${d.icon}" style="color:${d.icon.includes('sun') ? '#fbc02d' : '#4fc3f7'}"></i></div>
                <div class="f-temp">${d.temp}°C</div>
            `;
            forecastContainer.appendChild(div);
        });
    }
}

function backToSelector() {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('crop-selector').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', initDashboard);
