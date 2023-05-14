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
  let displayDay = document.querySelector("#day-of-week");
  displayDay.innerHTML = currentDay;
  return currentDay;
}
let today = new Date();
//let birthday = new Date("1990/04/29");

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-center">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-md-2">
                <div
                  class="card text-center border-light mb-3 mx-auto"
                  style="max-width: 18rem"
                >
                  <div class="card-header bg-transparent weekday">${day}</div>
                  <div class="card-body">
                    <p class="card-text future-temperature">
                      <span class="forecast-high-temp">22°</span> | 12°
                    </p>
                    <img
                      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                      alt="forecast icon"
                      width="40"
                    />
                  </div>
                </div>
             `;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}

function showTime(date) {
  let hour = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let currentTime = `${hour}:${minutes}`;
  let displayTime = document.querySelector("#time");
  displayTime.innerHTML = currentTime;
  return currentTime;
}
showDate(today);
showTime(today);

let key = "4o57feb2953ca1cb4a50930ctd015ccd";
let urlEndpoint = "https://api.shecodes.io/weather/v1/";
let unit = "metric";

function showDefaultCityWeather(defaultCityName) {
  let defaultUrl = `${urlEndpoint}current?query=${defaultCityName}&key=${key}&units=${unit}`;
  // let defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCityName}&appid=bb0df6985c2eab6a171d64a6bacbb4e1&units=metric`;
  console.log(defaultUrl);

  axios.get(defaultUrl).then(showWeatherData);
}

function changeCity(event) {
  event.preventDefault();
  // let key = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let city = document.querySelector("#typed-city");
  let cityName = city.value;

  let url = `${urlEndpoint}current?query=${cityName}&key=${key}&units=${unit}`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=${unit}`;
  city.value = "";

  axios.get(url).then(showWeatherData);
}

function getForecast(lon, lat) {
  let forecastUrl = `${urlEndpoint}forecast?lon=${lon}&lat=${lat}&key=${key}&units=${unit}`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(displayForecast);
}

function showWeatherData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let newTemperature = document.querySelector("#current-temp");
  newTemperature.innerHTML = temperature;
  console.log(temperature);

  let descriptionNow = document.querySelector("#description");
  descriptionNow.innerHTML = response.data.condition.description;

  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = response.data.city;

  let displayCountry = document.querySelector("#country");
  displayCountry.innerHTML = response.data.country;

  let iconElement = document.querySelector("#weather-icon");
  let iconName = response.data.condition.icon;
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconName}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  celsiusTemperature = response.data.temperature.current;

  getForecast(
    response.data.coordinates.longitude,
    response.data.coordinates.latitude
  );
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  // let unit = "metric";
  // openWeatherKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let url = `${urlEndpoint}current?lat=${lat}&lon=${lon}&key=${key}&units=${unit}`;

  // let url = `${urlEndpoint}current?$lon=${38}&lat=${44}&key=${key}&units=${unit}`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=${unit}`;
  console.log(url);
  axios.get(url).then(showWeatherData);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

showDefaultCityWeather("Catania");
