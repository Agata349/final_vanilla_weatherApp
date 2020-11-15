//changing the city name, temperature, humidity, wind speed and description based on input

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
     if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#current-date").innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main); 
}

function searchCity(city) {
  let apiKey = "dc47e5d5ff6f5cb1e2548e5a30cb1a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


//Changing city name, temperature and description based on current location

 function searchLocation(position) {
   let apiKey = "dc47e5d5ff6f5cb1e2548e5a30cb1a26";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
 }

 function getCurrentLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
 }

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

function changeTemp(){
 
let currentTemp = document.querySelector("#temperature");
currentTemp.innerHTML = `17 `;
}

let searchTemp = document.querySelector("form");
searchTemp.addEventListener("submit", changeTemp);

function changeToFahrenheit() {

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `63 `
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius() {
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = '17 '
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);





