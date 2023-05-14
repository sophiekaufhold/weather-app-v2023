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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-center">`;

  forecastData.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-md-2">
                <div
                  class="card text-center border-light mb-3 mx-auto"
                  style="max-width: 18rem"
                >
                  <div class="card-header bg-transparent weekday">${formatForecastDate(
                    day.time
                  )}</div>
                  <div class="card-body">
                    <p class="card-text future-temperature">
                      <span class="forecast-high-temp">${Math.round(
                        day.temperature.maximum
                      )}</span> | ${Math.round(day.temperature.minimum)}
                    </p>
                    <img
                      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                        day.condition.icon
                      }.png"
                      alt="forecast icon"
                      width="40"
                    />
                  </div>
                </div>
             `;
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
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

  axios.get(defaultUrl).then(showWeatherData);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#typed-city");
  let cityName = city.value;

  let url = `${urlEndpoint}current?query=${cityName}&key=${key}&units=${unit}`;
  city.value = "";

  axios.get(url).then(showWeatherData);
}

function getForecast(lon, lat) {
  let forecastUrl = `${urlEndpoint}forecast?lon=${lon}&lat=${lat}&key=${key}&units=${unit}`;
  axios.get(forecastUrl).then(displayForecast);
}

function showWeatherData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let newTemperature = document.querySelector("#current-temp");
  newTemperature.innerHTML = temperature;

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

  getForecast(
    response.data.coordinates.longitude,
    response.data.coordinates.latitude
  );
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `${urlEndpoint}current?lat=${lat}&lon=${lon}&key=${key}&units=${unit}`;

  axios.get(url).then(showWeatherData);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

showDefaultCityWeather("Catania");
