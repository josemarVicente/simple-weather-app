const valueSearch = document.getElementById('valueSearch');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.querySelector('.description');
const clouds = document.getElementById('clouds')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const form = document.querySelector('form');
const appContainer = document.querySelector('main');

const cityData = [];

const localStorageData = localStorage.getItem('citydata') || [];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(valueSearch != ''){
        searchWeather();
    }
})

const apiKey = "c0cba6c1e9108cd3692446efe2976bb8";
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`

const searchWeather = async () => {
   const res = await fetch(`${url}&q=${valueSearch.value}`);
   const data = await res.json();
    console.log(data);

    if(data.cod == 200){
        city.querySelector('figcaption').innerText = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;

        temperature.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('figcaption').innerText = `${data.main.temp} º`;

        description.innerText = data.weather[0].description;

        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
        valueSearch.value = '';
        updateLS();
    } else {
        appContainer.classList.add('shake');

        setTimeout(() => {
            appContainer.classList.remove('shake')
        }, 1000);
    }
}

const updateLS = () => {
    if(cityData.length){
        cityData.splice(0, 1, valueSearch.value);
    } else {
        cityData.push(valueSearch.value);
    }
    localStorage.setItem('citydata', cityData);
}
