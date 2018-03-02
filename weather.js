let updateWidget = function(data) {

  // console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE

  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.
  current_temp = Math.round(data.main.temp)
  icon = data.weather[0].icon
  location_name = data.name

  $("#weather").children("img").attr("src", "https://openweathermap.org/img/w/".concat(icon, ".png"))
  $("#weather").children("div").children("p").text("It is ".concat(current_temp, " degrees outside."));
  $("#weather").children("div").children("h4").text(location_name);
}


let getWeather = function(event) {

  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    let apiKey = 'e38e601062df4841f3932da84610dedb'; // REPLACE THIS VALUE with your own key. - DONE

    let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
    weatherServiceURL += 'lat=' + latitude
    weatherServiceURL += '&lon=' + longitude
    weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

    fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);

  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

}


$("#weather").on("click", "a", function (event) {
  getWeather();
});


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
