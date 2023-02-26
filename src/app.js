function displayData(response) {
  console.log(response.data);

  let temperature = document.querySelector("#city-temp");
  let city = document.querySelector("#user-city");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  city.innerHTML = response.data.city;
}

let apiKey = "03fbf04a1etcf05607fe0offcb23d041";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;
console.log(apiUrl);

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#user-city");
  console.log(cityInput.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", submitCity);

axios.get(apiUrl).then(displayData);
