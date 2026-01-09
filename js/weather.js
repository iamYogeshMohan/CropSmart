const weatherData = {
    current: { temp: 28, condition: "Partly Cloudy", icon: "fas fa-cloud-sun" },
    forecast: [
        { day: "Today", temp: 28, condition: "Partly Cloudy" },
        { day: "Tomorrow", temp: 27, condition: "Cloudy" },
        { day: "Wed", temp: 26, condition: "Rain" },
        { day: "Thu", temp: 24, condition: "Heavy Rain" },
        { day: "Fri", temp: 25, condition: "Rain" },
        { day: "Sat", temp: 28, condition: "Sunny" },
        { day: "Sun", temp: 29, condition: "Sunny" }
    ]
};

const cropAlerts = {
    rice: { alert: "⚠️ Heavy rainfall expected in 3 days. Delay fertilizer application.", type: "warning" },
    wheat: { alert: "❄️ Frost warning for early morning. Apply light irrigation.", type: "danger" },
    cotton: { alert: "🌧️ Light rain expected. Good for sowing.", type: "info" },
    sugarcane: { alert: "🔥 Heat wave alert. Ensure adequate water supply.", type: "danger" },
    default: { alert: "✅ Weather looks good for field operations.", type: "success" }
};

function initWeather() {
    renderForecast();
    // Default select
    updateCropAlert('rice');
}

function renderForecast() {
    const forecastContainer = document.getElementById('forecast-container');
    if (!forecastContainer) return;

    forecastContainer.innerHTML = '';

    weatherData.forecast.forEach(d => {
        const div = document.createElement('div');
        div.className = 'forecast-card';
        div.innerHTML = `
            <div class="f-day">${d.day}</div>
            <div class="f-icon">${getIcon(d.condition)}</div>
            <div class="f-temp">${d.temp}°C</div>
            <div class="f-cond">${d.condition}</div>
        `;
        forecastContainer.appendChild(div);
    });
}

function getIcon(condition) {
    if (condition.includes("Sun")) return '<i class="fas fa-sun" style="color:#fbc02d"></i>';
    if (condition.includes("Rain")) return '<i class="fas fa-cloud-rain" style="color:#4fc3f7"></i>';
    if (condition.includes("Cloud")) return '<i class="fas fa-cloud" style="color:#90a4ae"></i>';
    return '<i class="fas fa-cloud-sun"></i>';
}

function updateCropAlert(crop) {
    const alertBox = document.getElementById('weather-alert-box');
    const adviceText = document.getElementById('weather-advice');

    const data = cropAlerts[crop] || cropAlerts.default;

    adviceText.innerText = data.alert;

    // Reset classes
    alertBox.className = 'alert-banner';
    alertBox.classList.add(`alert-${data.type}`);

    // Animation
    alertBox.style.animation = 'none';
    alertBox.offsetHeight; /* trigger reflow */
    alertBox.style.animation = 'slideIn 0.5s ease-out';
}

// Expose
window.updateCropAlert = updateCropAlert;
document.addEventListener('DOMContentLoaded', initWeather);
