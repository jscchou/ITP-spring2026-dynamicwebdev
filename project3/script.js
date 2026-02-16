
window.onload = () => {
    alert("Welcome!");
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

        layer.addEventListener('click', () => {
            const locationName = layer.parentElement.querySelector('.main-title').innerText;
            showWeatherPopup(locationName); 
        });
    });

    // Close modal when clicking 'x'
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

};

async function showWeatherPopup(locationName) {
    const modal = document.getElementById("weatherModal");
    const modalTitle = document.getElementById("modalTitle");
    const currentTempText = document.getElementById("currentTemp");

    modalTitle.innerText = locationName;
    modal.style.display = "block";
    currentTempText.innerText = "Loading...";

    const params = new URLSearchParams({
        access_key: "8d1ec3197fefddc8db850f991fcf9db0",
        query: locationName + ", Taiepi, Taiwan",
        units: "m"
    });

    try {
      
        const response = await fetch("http://api.weatherstack.com/current?" + params);
        const jsonData = await response.json();


        if (jsonData.error) {
            console.error("API Error:", jsonData.error.info);
            currentTempText.innerText = "Error: " + jsonData.error.code;
            return;
        }

        if (jsonData.current) {
            const temp = jsonData.current.temperature;
            const desc = jsonData.current.weather_descriptions[0];
            currentTempText.innerHTML = `Currently: <strong>${temp}°C</strong><br>${desc}`;
        } else {
            currentTempText.innerText = "Location not found.";
        }
    } catch (error) {
        currentTempText.innerText = "Network Error.";
        console.error("Fetch Error:", error);
    }
}