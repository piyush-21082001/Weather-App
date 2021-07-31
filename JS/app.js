var cityName = document.querySelector(".cityName");
var submit = document.querySelector(".submit");

var temperature = document.querySelector(".temperature");
var fahrenheit = document.querySelector(".inFahrenheit");
var names = document.querySelector("#location");
var sunrise = document.querySelector("#sunrise");
var sunset = document.querySelector("#sunset");
var speed = document.querySelector("#speed");
var degrees = document.querySelector("#degrees");
var cond_logo = document.querySelector("#cond_logo");
var cond = document.querySelector("#conditions")


function getData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=ca62c440c47988f9b6016600e9561c20`)
        .then(response =>
            response.json())
        .then(data => {
            //console.log(data);
            var tempCity = data.main.temp - 273;
            temperature.innerHTML = parseFloat(tempCity.toPrecision(3)) + "°C";
            var fahrenheitTemp = parseFloat(tempCity.toPrecision(3))*(9/5) + 32;
            fahrenheit.innerHTML = parseFloat(fahrenheitTemp.toPrecision(4))+"°F";
           
            var nameOfCity = data.name;
            var country = data.sys.country;
            names.innerHTML = `${nameOfCity}, ${country}`;
            cond.innerHTML= ` ${data.weather[0].main} `;
            var d_n=data.weather[0].icon;
            const cond_logo_day = d_n.slice(0, -1)+"d";
            cond_logo.innerHTML=`<img src='http://openweathermap.org/img/wn/${cond_logo_day}@2x.png'>`;
            var windSpeed = data.wind.speed;
            speed.innerHTML =  `Wind Speed: ${windSpeed} m/s`;
            var deg = data.wind.deg;
            degrees.innerHTML = `Wind Direction: ${deg} deg`;

            function unixToTimeStamp(number) {
                // convert to milliseconds and  
                // then create a new Date object 
                dateObj = new Date(number * 1000);
                //utcString = dateObj.toUTCString();

                var time = dateObj.toTimeString();
                var finalTime = time.slice(0, 5);
                return finalTime;
            }

            var sunriseTime = data.sys.sunrise;
            var sunsetTime = data.sys.sunset;
            sunrise.innerHTML = `Sunrise: ${unixToTimeStamp(sunriseTime)}`;
            sunset.innerHTML = `Sunset: ${unixToTimeStamp(sunsetTime)}`;
            

            // if(data.weather[0].main== 'Mist')
            //     alert("MIST");
            // console.log(data.weather[0].main);
            // console.log(unixToTimeStamp(sunriseTime));
            // console.log(unixToTimeStamp(sunsetTime));
    })
        .catch(error => alert("wrong city name!"));
}



submit.addEventListener("click", () => {
    getData();
});

cityName.addEventListener("keydown", (event) => {
    if (event.keyCode === 13){
        event.preventDefault();
        getData();
    }
}); 


