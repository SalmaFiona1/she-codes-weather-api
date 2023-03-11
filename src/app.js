function lastUpdateTime(timestamp) {
  let date = new Date(timestamp);
  let currentDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let am_pm = date.getHours() < 12;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  let day = days[date.getDay()];

  let month = months[date.getMonth()];
  let timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  return ` ${day} ${currentDate} ${month} ${timeString}${am_pm ? "AM" : "PM"}`;
}

function displayData(response) {
  console.log(response.data);

  let temperature = document.querySelector("#city-temp");
  let city = document.querySelector("#user-search-result");
  let current = document.querySelector("#feels-like");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#city-description");
  city.innerHTML = `${response.data.city}, ${response.data.country}`;
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  current.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;
  description.innerHTML = `${response.data.condition.description}`;

  let dateElement = document.querySelector("#last-updated");
  dateElement.innerHTML = lastUpdateTime(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `img/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt", response.data.condition.description);
  let secondIcon = document.querySelector("#weather-icon");
  secondIcon.setAttribute("src", `img/${response.data.condition.icon}.png`);
  secondIcon.setAttribute("alt", response.data.condition.description);
  getForecastData(response.data.coordinates);
}

function getForecastData(coordinates) {
  let apiKey = "03fbf04a1etcf05607fe0offcb23d041";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDate(date) {
  let format = new Date(date * 1000);
  let day = format.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let newForecast = response.data.daily;

  let forecastElement = document.querySelector("#city-forecast");
  let forecastHTML = ` <div class="row m-1">`;
  newForecast.forEach(function (forecastDay, index) {
    let des = forecastDay.condition.description;
    if (index < 3) {
      forecastHTML =
        forecastHTML +
        `

            <div class="col-2 p-2 m-1   bg-gradient rounded-1 w-100 text-end forecast">
              <div class="weather-forecast-day fw-semibold">${formatDate(
                forecastDay.time
              )}
               <span class="city-forecast-temp
">${Math.round(forecastDay.temperature.day)}°C</span></div>


               <span class="city-forecast-description
">${des.charAt(0).toUpperCase() + des.slice(1)}
</span>
              <img
       
                src="img/${forecastDay.condition.icon}.png"
                alt=""
                width="52"
                class="forecast-image p-1"
              /> 
             
            </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "03fbf04a1etcf05607fe0offcb23d041";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#user-city");
  search(cityInput.value);
}

function showLocation(position) {
  let apiKey = "03fbf04a1etcf05607fe0offcb23d041";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#locate-button");
button.addEventListener("click", getLocation);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

search("New York");

// create function for undefined search
