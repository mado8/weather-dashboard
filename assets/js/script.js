// to do
// fetch api and specify parameters for each of the following instances
// dynaically create buttons when search bar is clicked and contains a valid city
// when search bar is clicked, add recent searches by storing in local storage
// obtain current parameters for city including name, date, icon of weather, humidity, wind UV index, and temp
// obtain 5 day forecast parameters that displays date, icon of weather, temp, wind, and humidity
// create if statements for uv index color change to indicate favorable, moderate, or severe conditons

//create variables
const apiKey = `7b2108bf7e20dd2cb90cba345009dacd`
var search = document.getElementById("search-button");
var currentWeather = document.getElementById("current-weather");
var forecast = document.getElementById("forecast");
var recentSearch = document.getElementById("recent-seaarches");
let city = denver;

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

fetch(url)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data)
    })