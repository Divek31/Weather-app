const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;
const container = document.querySelector(".container");

function setTheme(theme) {
  body.className = theme;
  container.className = `container ${theme}`;
  localStorage.setItem("theme", theme);
}

// Load saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
};

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// Get weather info
async function getWeather() {
  const location = document.getElementById("location").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (!location) {
    alert("Please enter a location");
    return;
  }

  const apiKey = "0f235d6315904b70aa8121137251003";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
    } else {
      weatherInfo.innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon" />
      `;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Could not fetch weather data</p>`;
  }
}

// Clear input and result
function clearWeather() {
  document.getElementById("location").value = "";
  document.getElementById("weatherInfo").innerHTML = "";
}
