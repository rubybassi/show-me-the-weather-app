// reference variables for DOM
const weatherSearchForm = $("#weatherSearchform");
const weatherSearchBtn = $("#userSubmit");
let userInput = $("#userInput");
const searchListContainer = $("#seachHistoryList");
let currentWeatherContainer = $("#currentWeatherContainer");
const fiveDayContainer = $("#forecastContainer");
const myKey = "a80545903d1ac3a1c7c18dc4d9d8c063";

// event listener for user search input
$(weatherSearchBtn).on("click", (event) => {
  event.preventDefault();
  const usercity = userInput.val();
  // console.log("user city:", usercity);
  getCurrentForecast(usercity);
  getFiveDayForecast(usercity);
  currentWeatherContainer.empty(); // clears additional results from day container - need to run save search ftn before this
});

// api call for current weather
const getCurrentForecast = (usercity) => {
  const queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    usercity +
    "&units=metric" +
    "&appid=" +
    myKey;
  //console.log("query url:", queryUrl);
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};

// handle current day weather data function - render page current day
let handleWeatherData = (data) => {
  //console.log("weather data", data);
  let temperature = data.main.temp;
  // console.log("current weather is", temperature);
  let cityName = data.name;
  let windSpeed = data.wind.speed;
  let humidity = data.main.humidity;
  let icon = data.weather[0].icon;
  let date = data.dt;
  let formattedDate = new Date(date * 1000);
  let latitude = data.coord.lat;
  let longitude = data.coord.lon;
  let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  $("#currentWeatherContainer")
    .append("<h2>" + cityName + "</h2>")
    .append("<p>" + formattedDate + "</p>")
    .append("<img src=" + iconUrl + ">")
    .append("<p>Temperature: " + temperature + "&#176;C</p>")
    .append("<p>Humidity: " + humidity + "%</p>")
    .append("<p>Windspeed: " + windSpeed + " MPH</p>");
  getUvIndex(latitude, longitude);
};

// api call and funtion for UV index - need to add uv color rules
const getUvIndex = (latitude, longitude) => {
  let queryUVUrl =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    myKey;
  //console.log("query url:", queryUVUrl);
  $.ajax({
    url: queryUVUrl,
  })
    .then(function (uv) {
      //console.log(queryUVUrl);
      let uvIndex = uv.value;
      $("#currentWeatherContainer").append("<p>UV Index: " + uvIndex + " </p>"); //change to uv
    })
    .catch();
};

// api call for 5 day forecast
const getFiveDayForecast = (usercity) => {
  const query5DayUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    usercity +
    "&units=metric" +
    "&appid=" +
    myKey;
  //console.log("query url:", query5DayUrl);
  $.ajax({
    url: query5DayUrl,
  })
    .then(handle5DayWeatherData)
    .catch();
};

// handle current day weather data function - render page - 5 day forecast
const handle5DayWeatherData = (data) => {
  //console.log("5 day", data);
  let date = data.list[0].dt;
  let formattedDate = new Date(date * 1000);
  //console.log("date:", formattedDate);
  let icon = data.list[0].weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  //console.log("icon url:", iconUrl);
  let temperature = data.list[0].main.temp;
  //console.log("temp:", temperature);
  let humidity = data.list[0].main.humidity;
  $("#forecastContainer").append("<h3>5-Day Forecast:</h3>"); 
  data.list.forEach((forecast) => {
    let icon = forecast.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
     // console.log("forecast", forecast.main.temp);
     $("#forecastContainer")
    .append("<p>" + new Date(forecast.dt * 1000) + "</p>")
    .append("<img src=" + iconUrl + ">")
    .append("<p>Temperature: " + forecast.main.temp + "&#176;C</p>")
    .append("<p>Humidity: " + forecast.main.humidity + "%</p>");
  });
  /*
   
  $("#forecastContainer")
    .append("<h2>" + cityName + "</h2>")
    .append("<p>" + formattedDate + "</p>")
    .append("<img src=" + iconUrl + ">")
    .append("<p>Temperature: " + temperature + "&#176;C</p>")
    .append("<p>Humidity: " + humidity + "%</p>")
    .append("<p>Windspeed: " + windSpeed + " MPH</p>");
  getUvIndex(latitude, longitude);
  */





};
// init function

// set items to storage

// get items from storage

// get last searched item function

// render search history function

// event listener on search history clicks using event delagation on #seachHistoryList
