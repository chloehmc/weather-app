let now = new Date();

let h6 = document.querySelector("h6");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

if (minutes < 10) {
  h6.innerHTML = `${day}, ${month} ${date} , ${hours}:0${minutes}`;
} else {
  h6.innerHTML = `${day}, ${month} ${date} , ${hours}:${minutes}`;
}

//search city

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let citySearchForm = document.querySelector("#searchForm-input");
citySearchForm.addEventListener("submit", handleSearch);

//adding weather api

function showCurrentWeather(response) {
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let feelsLikeTemp = document.querySelector("#feels-like");

  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed}km/h`;
  feelsLikeTemp.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function searchCity(city) {
  let apiKey = "3e88fd9051f4127bd81525117a247e3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

//adding geolocation
function showCurrentPosition(position) {
  let apiKey = "3e88fd9051f4127bd81525117a247e3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
