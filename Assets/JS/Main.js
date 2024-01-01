// #region Import Packages

import {
    displayNone,
    displayBlock,
    turkishToUpper,
    dateBuilder
} from './MidleWare.js';

// #endregion

// #region Variables

const baseURL = "https://api.openweathermap.org/data/2.5/";
const apiKey = "ec0f4802bacb7d1afe289644c17f8660";

const searchBox = document.getElementById("searchBar");
let city = document.getElementById("city");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let weather_el = document.getElementById("weather");
let hilow = document.getElementById("hilow");

// #endregion

// #region Window Onload
const getFindCity = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getResultsByCoords(position.coords.latitude, position.coords.longitude);
        }, error => {
            getResultsByCityName('İstanbul');
        });
    } else {
        getResultsByCityName('İstanbul');
    }
}

window.onload = getFindCity;
const getResultsByCoords = (lat, lon) => {
    let queryURL = `${baseURL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(queryURL)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

// #endregion

// #region EventListener Functions  

const setQuery = (evt) => {
    if (evt.keyCode == 13) {
        getResultsByCityName(searchBox.value);
    }
}

const setChange = (evt) => {

    if (searchBox.value === '') {
        setTimeout(getFindCity, 2000);
    }
}

const getResultsByCityName = (cityName) => {

    let queryURL = `${baseURL}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(queryURL)
        .then(response => {
            if (!response.ok) {

                displayNone([date, temp, weather, hilow]);
                city.innerText = 'Böyle Bir Şehir Yoktur';
            }
            return response.json();
        })
        .then(data => {
            if (data.code === '404') {
                displayNone([date, temp, weather, hilow]);
                city.innerText = 'Tekrar Deneyiniz';
            }
            displayResults(data);
        })
        .catch(error => {
            displayNone([date, temp, weather, hilow]);
            console.error('Hata:', error);
        });
}

const displayResults = (weathers) => {

    displayBlock([date, temp, weather, hilow]);
    let now = new Date();

    city.innerText = `${weathers.name}, ${weathers.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weathers.main.temp)}<span>°C</span>`;
    weather_el.innerText = turkishToUpper(weathers.weather[0].description);
    hilow.innerText = `${Math.round(weathers.main.temp_min)}°C / ${Math.round(weathers.main.temp_max)}°C`;
}

searchBox.addEventListener("keypress", setQuery);
searchBox.addEventListener("input", setChange);

// #endregion

