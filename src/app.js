function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let year = date.getFullYear();
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
  let month = months[date.getMonth()];
  let dateDay = date.getDate();

  let currentDay = `${day}, ${month} ${dateDay}, ${year}`;
  console.log(currentDay);
  let displayDay = document.querySelector("#day-of-week");
  displayDay.innerHTML = currentDay;
  return currentDay;
}
let today = new Date();
let birthday = new Date("1990/04/29");

function showTime(date) {
  let hour = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let currentTime = `${hour}:${minutes}`;
  console.log(currentTime);
  let displayTime = document.querySelector("#time");
  displayTime.innerHTML = currentTime;
  return currentTime;
}
showDate(today);
showTime(today);

function showDefaultCityWeather(defaultCityName) {
  let defaultUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCityName}&key=4o57feb2953ca1cb4a50930ctd015ccd&units=metric`;
  console.log(defaultUrl);
  axios.get(defaultUrl).then(showWeatherData);
}

showDefaultCityWeather("Catania");

function changeCity(event) {
  event.preventDefault();
  let key = "4o57feb2953ca1cb4a50930ctd015ccd";
  let city = document.querySelector("#typed-city");
  let cityName = city.value;
  let unit = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${key}&units=metric`;
  console.log(url);
  city.value = "";

  axios.get(url).then(showWeatherData);
}

function showWeatherData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let newTemperature = document.querySelector("#current-temp");
  newTemperature.innerHTML = temperature;

  let lowNow = Math.round(response.data.main.temp_min);
  let lowNowElement = document.querySelector("#low-now");
  lowNowElement.innerHTML = lowNow;

  let highNow = Math.round(response.data.main.temp_max);
  let highNowElement = document.querySelector("#high-now");
  highNowElement.innerHTML = highNow;

  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = response.data.name;

  let displayCountry = document.querySelector("#country");
  displayCountry.innerHTML = response.data.sys.country;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);

  let lowTemperatureElement = document.querySelector(".low");
  let lowTemperature = lowTemperatureElement.innerHTML;
  lowTemperature = Number(lowTemperature);
  lowTemperatureElement.innerHTML = Math.round((lowTemperature * 9) / 5 + 32);

  let highTemperatureElement = document.querySelector(".high");
  let highTemperature = highTemperatureElement.innerHTML;
  highTemperature = Number(highTemperature);
  highTemperatureElement.innerHTML = Math.round((highTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);

  let lowTemperatureElement = document.querySelector(".low");
  let lowTemperature = lowTemperatureElement.innerHTML;
  lowTemperature = Number(lowTemperature);
  lowTemperatureElement.innerHTML = Math.round(((lowTemperature - 32) * 5) / 9);

  let highTemperatureElement = document.querySelector(".high");
  let highTemperature = highTemperatureElement.innerHTML;
  highTemperature = Number(highTemperature);
  highTemperatureElement.innerHTML = Math.round(
    ((highTemperature - 32) * 5) / 9
  );
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let key = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`;
  console.log(url);
  axios.get(url).then(showWeatherData);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);
