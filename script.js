window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = 'https://api.weatherapi.com/v1/forecast.json?key=ea9077a06c8d452b888163711211602&q= {location}';

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temp_f, condition, temp_c} = data.current;
          const {tz_id} = data.location;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = condition.text;
          locationTimezone.textContent = tz_id;
          var logo = document.getElementById('icon');
          logo.src = condition.icon;

            //Change temperature to Celsius/Farenheit
              temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                  temperatureSpan.textContent = "C";
                }else{
                  temperatureSpan.textContent ="F"
                }
                if(temperatureDegree.textContent == temp_f){
                  temperatureDegree.textContent = temp_c;
                }else{
                  temperatureDegree.textContent = temp_f;
                }
              });
        });
    });
  }
});