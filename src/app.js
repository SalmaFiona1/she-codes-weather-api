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

  let iconElement = document.querySelector("#city-icon");
  iconElement.setAttribute(
    "src",
    `img/${response.data.condition.icon_url}.png`
  );

  iconElement.setAttribute("alt", response.data.condition.icon_url);
}

// let cityInput = document.querySelector("#city-search-result");
// cityInput.innerHTML = `${city}`;

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

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

search("New York");
