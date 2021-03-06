const apiKey = `7b2108bf7e20dd2cb90cba345009dacd`
var searchInput = document.getElementById("search-input");
var search = document.getElementById("search-button");
var currentWeather = document.getElementById("current-weather");
var forecast = document.getElementById("forecast");
var recentSearch = document.getElementById("recent-searches");
var myCities = JSON.parse(localStorage.getItem("myCities") || "[]");
var city = 'denver'

const unixTimestamp = new Date()
const weekday = unixTimestamp.toLocaleString("en-US", {weekday: "long"})
const month = unixTimestamp.toLocaleString("en-US", {month: "long"})
const day = unixTimestamp.toLocaleString("en-US", {day: "numeric"})

const handleInput = (e) => {
    e.preventDefault();
    city = e.target.value
    console.log(city)
}

const handleSubmit = (e) => {
    e.preventDefault();
    myCities.push(city);
    localStorage.setItem('myCities', JSON.stringify(myCities))
    console.log(myCities)
    renderOneCity(myCities[myCities.length -1])
    renderPage();
}

const getSearch = () => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
        document.getElementById('my-weather-title').innerHTML = `
        <div>
            ${city.toUpperCase()}
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}"></img>'
            ${weekday.toUpperCase()}, ${month.toUpperCase()} ${day}
        </div>`
        document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp} ºF`
        document.getElementById('feels-like').innerHTML = `Feels Like: ${data.main.feels_like} ºF`
        document.getElementById('wind').innerHTML = `Wind: ${data.wind.speed} MPH`
        document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity} %`
        // document.getElementById('uv-index')
        let lat = data.coord.lat
        let lon = data.coord.lon
        getUV(lat, lon)
    }) 
}

const getForecast = () => {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
        for(let i = 0; i<5; i++) {
            const cardItem = document.getElementById(`weather-card-${i}`)
            const nextDay = i+1;

            cardItem.innerHTML = `
                <div id="forecast-title">
                    <h5 class="card-title">${moment().add(nextDay, 'days').format('l')}</h5>
                    <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="${data.list[i].weather[0].description}"></img>
                </div>
                <div id="forecast-text">
                    <p>Temp: ${data.list[i].main.temp} ºF</p>
                    <p>Wind: ${data.list[i].wind.speed} MPH</p>
                    <p>Humidity: ${data.list[i].main.humidity} %</p>
                </div>
            `
        }
    })
}

const getUV = (lat, lon) => {
    var url = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
        document.getElementById('uv-index').innerHTML = `UV Index: ${data[0].value}`
        if (data[0].value < 3){
            document.getElementById('uv-index').classList.add('green');
            document.getElementById('uv-index').classList.remove('yellow');
            document.getElementById('uv-index').classList.remove('red');
        } else if (data[0].value >= 3 && data[0].value < 6) {
            document.getElementById('uv-index').classList.add('yellow');
            document.getElementById('uv-index').classList.remove('green');
            document.getElementById('uv-index').classList.remove('red');
        } else {
            document.getElementById('uv-index').classList.add('red');
            document.getElementById('uv-index').classList.remove('green');
            document.getElementById('uv-index').classList.remove('yellow');
        };
    })
}

const renderOneCity = (city) => {
    let button = document.createElement("button");
        button.className += "card-body"
        button.setAttribute("value", city)
        button.innerHTML = city
        recentSearch.append(button)
}

const renderCities = () => {
    console.log(myCities)
    myCities.forEach(city => {
       console.log(city)
       renderOneCity(city)
    })
}

const renderPage = () => {
    getSearch()
    getForecast();
}


recentSearch.addEventListener('click', (event) => {
  if (!event.target.nodeName === 'BUTTON') return
  city = event.target.value;
  renderPage()
})

searchInput.addEventListener("change", handleInput)
search.addEventListener('click', handleSubmit)
renderCities();
renderPage();