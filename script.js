window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

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
          const { temp_f, condition} = data.current;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = condition.text;
          const {tz_id} = data.location;
          locationTimezone.textContent = tz_id;
        });
    });
  }

  //function setIcons(icon, iconID){
    //const skycons = new skycons({color: "white"});
    //const currentIcon = 
  //}
});