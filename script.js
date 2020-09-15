$(document).ready(function () {
  //Load page
  lastSearch();
  var date = moment().format("MM/ DD/ YYYY");
  var cities = [];

  //Listener for the search city button. Also calling the cityWeather and fiveDayForecast functions
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    var APIKey = "7dca2ccb58435f03c75b86aee0974ae8";

    cityWeather(city, APIKey);
    fiveDayForecast(city, APIKey);
  });

  function cityWeather(city, APIKey) {
    var lat;
    var lon;

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "," +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";

    // Creating an ajax function to retrieve data and display in html
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // Log the data in HTML
      var cityTemp = response.main.temp;
      var cityHumidity = response.main.humidity;
      var cityWind = response.wind.speed;
      var icon = response.weather[0].icon;
      lat = response.coord.lat;
      lon = response.coord.lon;
      console.log(icon);
      var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      $(".city-name").text(city + " " + "(" + date + ")");
      $("#icon").attr("src", iconurl);
      $("#cityTemp").text("Temperature: " + cityTemp + " F");
      $("#cityHumid").text("Humidity: " + cityHumidity + " %");
      $("#cityWind").text("Wind Speed: " + cityWind + " MPH");

      console.log(lat);
      console.log(lon);
      calculateUV(lat, lon);
      renderPastSerachButton(city);
      storeSearch();
    });
  }
  //Creating function to retrieve 5 day forcast data
  function fiveDayForecast(city, APIKey) {
    var queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";
    //   Creating an ajax function to retrieve data and log to the console
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Day One Forecast
      var date = response.list[4].dt_txt;
      var humidity = response.list[4].main.humidity;
      var temp = response.list[4].main.temp;
      $(".day-one-date").text(date);
      $(".day-one-temp").text("Temp: " + temp + " F");
      $(".day-one-humidity").text("Humidity: " + humidity + " %");

      // Day Two Forecast
      var date = response.list[12].dt_txt;
      var humidity = response.list[12].main.humidity;
      var temp = response.list[12].main.temp;
      $(".day-two-date").text(date);
      $(".day-two-temp").text("Temp: " + temp + " F");
      $(".day-two-humidity").text("Humidity: " + humidity + " %");

      //Day Three Forecast
      var date = response.list[20].dt_txt;
      var humidity = response.list[20].main.humidity;
      var temp = response.list[20].main.temp;
      $(".day-three-date").text(date);
      $(".day-three-temp").text("Temp: " + temp + " F");
      $(".day-three-humidity").text("Humidity: " + humidity + " %");

      //Day Four Forecast
      var date = response.list[28].dt_txt;
      var humidity = response.list[28].main.humidity;
      var temp = response.list[28].main.temp;
      $(".day-four-date").text(date);
      $(".day-four-temp").text("Temp: " + temp + " F");
      $(".day-four-humidity").text("Humidity: " + humidity + " %");

      //   Day Five Forecast
      var date = response.list[36].dt_txt;
      var humidity = response.list[36].main.humidity;
      var temp = response.list[36].main.temp;
      $(".day-five-date").text(date);
      $(".day-five-temp").text("Temp: " + temp + " F");
      $(".day-five-humidity").text("Humidity: " + humidity + " %");
    });
  }

  function calculateUV(lat, lon) {
    console.log(lat);
    console.log(lon);
    var APIKey = "7dca2ccb58435f03c75b86aee0974ae8";
    var queryURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.value);
      var uv = response.value;
      $(".cityUV").text("UV Index: " + uv);
    });
  }

  function renderPastSerachButton(city) {
    cities.push(city);
    console.log(cities);
    // $(".city-btn").empty();
    $(".city-btn").html("");
    for (var i = 0; i < cities.length; i++) {
      var c = $("<button>");
      c.addClass("city");
      c.attr("data-name", cities[i]);
      c.text(cities[i]);
      $(".city-btn").prepend(c);
    }
  }
  //Listner for the history seraches
  $(".city-btn").on("click", function (event) {
    event.preventDefault();
    var city = $(this).attr("data-name");
    console.log(city);
    //call searchfunction
  });

  function storeSearch() {
    localStorage.setItem("city", JSON.stringify(cities));
  }
  function lastSearch() {
    var retrievedData = localStorage.getItem("city");
    var cities2 = JSON.parse(retrievedData);
    if (cities2[0] == "null") {
      console.log("do nothing!");
    } else {
      console.log(cities2[0]);
      $(".city-btn").html("");
      for (var i = 0; i < cities2.length; i++) {
        var c = $("<button>");
        c.addClass("city");
        c.attr("data-name", cities2[i]);
        c.text(cities2[i]);
        $(".city-btn").prepend(c);
      }
    }
  }
});
