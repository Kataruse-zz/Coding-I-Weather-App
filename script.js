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

      const api = 'https://api.weatherapi.com/v1/forecast.json?key=82304c6a5ad34bfa835164252210802&q=${lat}, ${long}&days=1';

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temp_f, condition, temp_c} = data.current;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = condition.text;
          const {tz_id} = data.location;
          locationTimezone.textContent = tz_id;
            //Set Icon
            const {icon} = data.current.condition; 
            setIcons(icon, document.querySelector(".icon"));

            //Change temperature to Celsius/Farenheit
              temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                  temperatureSpan.textContent = "C";
                  temperatureDegree.textcontent = (temp_c);
                }else{
                  temperatureSpan.textContent ="F"
                  temperatureDegree.textcontent = temp_f;
                }
              });
        });
    });
  }
  //Get help with adding icons
  function setIcons(icon, iconID,){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});