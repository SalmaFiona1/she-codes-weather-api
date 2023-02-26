function lastUpdateTime(timestamp) {}

function displayData(response) {
  console.log(response.data);

  let temperature = document.querySelector("#city-temp");
  let city = document.querySelector("#user-search-result");

  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  city.innerHTML = `${response.data.city}, ${response.data.country}`;
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
}
let city = "London";
let apiKey = "03fbf04a1etcf05607fe0offcb23d041";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log(apiUrl);
// let cityInput = document.querySelector("#city-search-result");
// cityInput.innerHTML = `${city}`;

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#user-city");
  console.log(cityInput.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", submitCity);

axios.get(apiUrl).then(displayData);
