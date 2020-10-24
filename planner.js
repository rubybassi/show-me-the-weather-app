// reference variables for DOM
const weatherSearchForm = $("#weatherSearchform");
const weatherSearchBtn = $("#userSubmit");
let userInput = $("#userInput");
const searchListContainer = $("#seachHistoryList");
let currentWeatherContainer = $("#currentWeatherContainer");
const fiveDayContainer = $("#forecastContainer");
const myKey = "a80545903d1ac3a1c7c18dc4d9d8c063";

// value variables from api
let uvIndex = "";

// event listener for user search input
$(weatherSearchBtn).on("click", (event) => {
  event.preventDefault();
  const usercity = userInput.val();
  // console.log("user city:", usercity);
  getCurrentForecast(usercity);
  currentWeatherContainer.empty(); // clears additional results from day container - need to run save search ftn before this
});

// api call for current weather
const getCurrentForecast = (usercity) => {
  const queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" + usercity + "&appid=" + myKey;
  // console.log('query url:', queryUrl);
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};

// handle current day weather data function
const handleWeatherData = (data) => {
  //console.log("weather data", data);
  let temperature = data.main.temp;
  // console.log("current weather is", temperature);
  let cityName = data.name;
  let windSpeed = data.wind.speed;
  let humidity = data.main.humidity;
  let icon = data.weather.icon;
  let date = data.dt;
  let formattedDate = new Date(date * 1000);
  let iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
  console.log(
    "city:",
    cityName,
    "windspeed:",
    windSpeed,
    "humidity:",
    humidity,
    "icon:",
    icon,
    "date:",
    formattedDate
  );
  $("#currentWeatherContainer").append('<p>' + cityName + '</p>').append('<p>' + formattedDate + '</p>')
  .append('<img src=' + iconUrl + '/>');
};

// icon url `http://openweathermap.org/img/w${icon}.png`

// api call for 5 day forecast

// apil call for UV index

// init function

// set items to storage

// get items from storage

// get last searched item function

// render page - current and 5 day forecast

// render search history function

// event listener on search history clicks using event delagation on #seachHistoryList
