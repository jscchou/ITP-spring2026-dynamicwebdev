
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
        key: "be1185548edf4ee589962751261602",
        q: locationName + ", Taiepi, Taiwan",
        units: "m"
    });

    try {
      
        const response = await fetch("https://api.weatherapi.com/v1/current.json?" + params);
        const jsonData = await response.json();


        if (jsonData.error) {
            console.error("API Error:", jsonData.error.info);
            currentTempText.innerText = "Error: " + jsonData.error.code;
            return;
        }

        if (jsonData.current) {
            const day = jsonData.current.is_day === 1 ? "Day" : "Night";
            const temp = jsonData.current.temp_c;
            const feelsliketemp = jsonData.current.feelslike_c;
            const humidity = jsonData.current.humidity;
            const time = jsonData.current.last_updated;

            currentTempText.innerHTML = `Time of Day: ${day}<br>
            Currently: ${temp}°C<br>
            Feels like: ${feelsliketemp}°C<br>
            Humidity: ${humidity}%<br>
            Last Updated: ${time}<br>
            `;
    
        } else {
            currentTempText.innerText = "Location not found.";
        }
    } catch (error) {
        currentTempText.innerText = "Network Error.";
        console.error("Fetch Error:", error);
    }
}