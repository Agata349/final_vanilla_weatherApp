//changing the city name, temperature, humidity, wind speed and description based on input

function formatDate(timestamp) {
    let date = new Date(timestamp);
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];

    return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
     if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
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

  celsiusTemp = response.data.main.temp;

}

function showForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
            <div class="col-2">
            ${formatHours(forecast.dt * 1000)}<br />
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width=50/>
            ${Math.round(forecast.main.temp_max)}°|${Math.round(forecast.main.temp_min)}°
            </div>
            `;
            } 
        }

function searchCity(city) {
  let apiKey = "dc47e5d5ff6f5cb1e2548e5a30cb1a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

function changeToFahrenheit(event) {
    event.preventDefault();
      let currentTemp = document.querySelector("#temperature");

      celsius.classList.remove("active");
      fahrenheit.classList.add("active");

      let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
      currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
    event.preventDefault();

    celsius.classList.add("active");
    fahrenheit.classList.remove("active");

    let currentTemp = document.querySelector("#temperature");
    currentTemp.innerHTML = Math.round(celsiusTemp); 
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

searchCity("New York");



