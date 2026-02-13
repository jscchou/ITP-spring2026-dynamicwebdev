// shows a alert when the page opens
alert("javascript page has been successfully linked!");
// write to the inspector console
console.log("this is a console message");

window.onload = async () => {
    console.log("window has loaded");

    const imageLayers = document.querySelectorAll('.image-layer');
    const modal = document.getElementById("weatherModal");
    const closeBtn = document.querySelector(".close-button");

    imageLayers.forEach((layer) => {
        layer.style.cursor = "pointer";

        layer.addEventListener('mouseenter', () => {
            layer.style.outline = "5px solid #ffcc00";
            layer.style.filter = "brightness(1.5)";
            layer.style.transition = "0.3s";
        });

        layer.addEventListener('mouseleave', () => {
            layer.style.outline = "none";
            layer.style.filter = "brightness(1.0)";
        });

        // Call showWeatherPopup instead of alert
        layer.addEventListener('click', () => {
            const locationName = layer.parentElement.querySelector('.main-title').innerText;
            showWeatherPopup(locationName); 
        });
    });

    // Close modal when clicking 'x'
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the box
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

async function showWeatherPopup(locationName) {
    const modal = document.getElementById("weatherModal");
    const modalTitle = document.getElementById("modalTitle");
    const currentTempText = document.getElementById("currentTemp");

    modalTitle.innerText = locationName;
    modal.style.display = "block";
    currentTempText.innerText = "Loading...";

    let params = new URLSearchParams({
        access_key: "8d1ec3197fefddc8db850f991fcf9db0",
        query: locationName + ", Taipei",
        units: "m"
    });

    try {
        // Note: Weatherstack free tier often requires http instead of https
        let response = await fetch("http://api.weatherstack.com/current?" + params);
        let jsonData = await response.json();

        if (jsonData.current) {
            currentTempText.innerHTML = `Currently: <strong>${jsonData.current.temperature}°C</strong><br>${jsonData.current.weather_descriptions[0]}`;
        } else {
            currentTempText.innerText = "Location not found.";
        }
    } catch (error) {
        currentTempText.innerText = "Error loading weather.";
        console.error(error);
    }
}