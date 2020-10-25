// Reference variables for DOM
const weatherSearchBtn = $('#userSubmit');
const forecastHeader = $('#forecastHeader');
const userInput = $('#userInput');
const currentWeatherContainer = $('#currentWeatherContainer');
const fiveDayContainer = $('#forecastContainer');
const myKey = 'a80545903d1ac3a1c7c18dc4d9d8c063';

// EVENT LISTENER for user search input
$(weatherSearchBtn).on('click', (event) => {
  event.preventDefault();
  const usercity = userInput.val().toLowerCase();
  // console.log("user city:", usercity);
  getData(usercity); // gets api data and renders containers
  saveToStorage(usercity);
  getSearchHistory(); 
  renderSearchHistory(usercity); 
  // clears additional results from containers
  currentWeatherContainer.empty();
  forecastHeader.empty();
  fiveDayContainer.empty();
});

// RENDER search history list function
const renderSearchHistory = (usercity) => {
  $('#searchHistoryContainer').append(
    `<button class='btn btn-light btn-block searchListBtn'>${usercity}</button>`
  );
};

// API call for current weather
const getCurrentForecast = (usercity) => {
  const queryUrl =
    `http://api.openweathermap.org/data/2.5/weather?q="${usercity}"&units=metric&appid="${myKey}`;
  //console.log("query url:", queryUrl);
  $.ajax({
    url: queryUrl,
  })
    .then(handleWeatherData)
    .catch();
};

// RENDER current day data and elements
let handleWeatherData = (data) => {
  //console.log("weather data", data);
  let icon = data.weather[0].icon;
  let date = data.dt;
  let formattedDate = new Date(date * 1000).toLocaleDateString();
  let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  $("#currentWeatherContainer")
    .append(`<h2>${data.name}</h2>`)
    .append(`<h2>(${formattedDate})</h2>`)
    .append(`<img src=${iconUrl}>`)
    .append(`<p>Temperature: ${data.main.temp}"&#176;C</p>`)
    .append(`<p>Humidity: ${data.main.humidity}"%</p>`)
    .append(`<p>'Windspeed: ${data.wind.speed}MPH</p>`);
  getUvIndex(`${data.coord.lat} ${data.coord.lon}`);
};

// API call and funtion for UV index and conditional statements for UV colour status
const getUvIndex = (latitude, longitude) => {
  let queryUVUrl =
    `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${myKey}`;
  //console.log("query url:", queryUVUrl);
  $.ajax({
    url: queryUVUrl,
  })
    .then(function (uv) {
      //console.log(queryUVUrl);
      let uvIndex = uv.value;
      $('#currentWeatherContainer').append(
        `<p>UV Index:<span>${uvIndex}</span></p>`);
      if (uvIndex <= 2) {
        $('#currentWeatherContainer')
          .find('span')
          .addClass('bg-success text-white');
      } else if (uvIndex > 2 && uvIndex < 7) {
        $('#currentWeatherContainer')
          .find('span')
          .addClass('bg-warning text-dark');
      } else {
        $("#currentWeatherContainer")
          .find('span')
          .addClass('bg-danger text-white');
      }
    })
    .catch();
};

// API call for 5 day forecast
const getFiveDayForecast = (usercity) => {
  const query5DayUrl =
    `http://api.openweathermap.org/data/2.5/forecast?q=${usercity}&units=metric&appid=${myKey}`;
  //console.log("query url:", query5DayUrl);
  $.ajax({
    url: query5DayUrl,
  })
    .then(handle5DayWeatherData)
    .catch();
};

// RENDER 5 day forecast data and elements
const handle5DayWeatherData = (data) => {
  $('#forecastHeader').append('<h4>5-Day Forecast:</h4>');
  data.list.forEach((forecast) => {
    let icon = forecast.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    let date = new Date(forecast.dt * 1000).toLocaleDateString();
    // console.log("forecast", forecast.main.temp);
    if (forecast.dt_txt.split(" ")[1] == "09:00:00") {
      $('#forecastContainer').append(
        `<div class="card bg-primary text-white"><div class="card-body">
        <p>${date}</p>
        <img src=${iconUrl}>
        <p>Temp:${forecast.main.temp}&#176;C</p>
        <p>Humidity:${forecast.main.humidity}&#176;C</p>
        </div></div>`
      );
    }
  });
};

let saveArray = [];
// SET items to storage
const saveToStorage = (usercity) => {
  saveArray.push(usercity);
  localStorage.setItem('cities', JSON.stringify(saveArray));
};

// GET items from storage
const getSearchHistory = () => {
  let retrievedArray = JSON.parse(localStorage.getItem('cities'));
  getLastItem(retrievedArray); // logs last item
  // if (retrievedArray !== null) saveArray = retrievedArray;
  console.log('my returned results:', retrievedArray); // logs an array
};




// event listener on search history clicks using event delagation on #seachHistoryList
$('button').on('click', (event) => {
  event.preventDefault();
  const userListSearch = $(this).text();
 // console.log("i clicked on button: ", userListSearch);
 // getData(userListSearch);
 
});


// $(function () { - on page load render last item if repeat visit
// get last searched item function - need to finish off to load on page refresh
const getLastItem = (retrievedArray) => {
  let last = retrievedArray[retrievedArray.length - 1];
  console.log('the last item was:', last);
  return last;
};


// call api data functions
const getData = (usercity) => {
  getCurrentForecast(usercity);
  getFiveDayForecast(usercity);
}