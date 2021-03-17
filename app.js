const notificationElement =document.querySelector(".notification");
const iconElement =document.querySelector(".weather-icon");
const tempElement =document.querySelector(".temperature-value p");
const descElement =document.querySelector(".temperature-description p");
const locationElement =document.querySelector(".location p");


const weather = {
    temperature:{
        value: 18,
        unit: "celsius"
    },
    description: "few clouds",
    iconId: '01d',
    city: 'Baliuag',
    country: 'PH'

};

const displayWeather = () =>{
iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;

descElement.innerHTML = weather.description;

locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

const celsiusToFahrenheit =(temperature) => {
  return  (temperature * 9/5) + 32;
}

tempElement.addEventListener('click',()=>{
if(weather.temperature.value === undefined)return;
if(weather.temperature.unit === 'celsius'){
  let fahrenheit =  celsiusToFahrenheit(weather.temperature.value);
  fahrenheit = Math.floor(fahrenheit);
  tempElement.innerHTML =`${fahrenheit}°<span>F</span>`;
  weather.temperature.unit = 'fahrenheit';
}else{
  tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
  weather.temperature.unit = 'celsius';
}
});
const KELVIN = 273;
const key = '60c43f70a366ca0443af425aee218049';
//Get position
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//Set Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//Show error
function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesn\'t Support Geolocation</p>';
} 

function  getWeather(latitude, longitude){
   let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;
   fetch(api) .then(function(response){
    let data = response.json();
    return data;   
   })
   .then(function(data){
       weather.temperature.value = Math.floor(data.main.temp - KELVIN);
       weather.description = data.weather[0].description;
       weather.iconId = data.weather[0].icon;
       weather.city = data.name;
       weather.country =data.sys.country;
   })
   .then(function(){
       displayWeather();
   });
}