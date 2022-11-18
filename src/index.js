// date and time part
let date = new Date();
let days = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thur", "Fri", "Sat"];
let dateItem = document.querySelector("#time-day");
let hour = date.getHours();
let minute = date.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}
dateItem.innerHTML = `${days[date.getDay()]} ${hour}:${minute}`;
// end of date and time part

// weather stuff!
function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let tempreture = document.querySelector("#degree");
  tempreture.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let unit = "metric";
  let city = document.querySelector("#input-text").value;
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiUrl}`).then(showWeather);
}
let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

function showCurrentWeather(event) {
  event.preventDefault();
  function getCurrentCityWeather(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiKey = "96771e971243152d6b8948878c26adde";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    axios.get(`${apiUrl}`).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(getCurrentCityWeather);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", showCurrentWeather);
