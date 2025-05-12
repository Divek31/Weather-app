document.getElementById("location").addEventListener("keypress", function (e) {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const location = document.getElementById("location").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (!location) {
    alert("Please enter a location");
    return;
  }

  const apiKey = "0f235d6315904b70aa8121137251003";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      weatherInfo.innerHTML = `<p style="color: red;">${data.error.message}</p>`;
    } else {
      weatherInfo.innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
      `;
    }
  } catch (error) {
    weatherInfo.innerHTML = "<p style='color: red;'>Could not fetch weather data</p>";
  }
}
