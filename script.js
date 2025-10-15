const apiKey='5bcc01a4a3f9cff8a2b9e4ebc54928f7';

const searchBtn=document.getElementById('searchBtn');
const cityInput=document.getElementById('cityInput');
const weatherBox=document.getElementById('weatherBox');
const errorText=document.getElementById('error');

searchBtn.addEventListener('click',()=>{
    const city=cityInput.value.trim();
    if(city){
        getWeather(city);
    }
});

async function getWeather(city) {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


try{
    const res=await fetch(url);
    if(!res.ok) throw new Error("city not found");

    const data =await res.json();
    updateWeather(data);
}catch(error){
    showError(true);
    weatherBox.classList.add('hidden');
}
}

function updateWeather(data){
    document.getElementById('cityName').textContent=`${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent=` 🌡️${data.main.temp}°C`;
    document.getElementById('desc').textContent=`📖 ${data.weather[0].description}`;
    document.getElementById('humidity').textContent=` 💧Humidity:${data.main.humidity}%`;
    document.getElementById('wind').textContent=`💨 Wind:${data.wind.speed}m/s`;

    showError(false);
    weatherBox.classList.remove('hidden');
}
      function showError(show){
        if(show){
            errorText.classList.remove('hidden');
        }else{
            errorText.classList.add('hidden');
        }
    
}