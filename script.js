$(document).ready(function () {
  //Load page
  var APIKey = "7dca2ccb58435f03c75b86aee0974ae8";
  var date = moment().format("MM/ DD/ YYYY");
  var cities = JSON.parse(localStorage.getItem("city")) || [];
  console.log;
  lastSearch();
  renderPastSerachButton();

  //Listener for the search city button. Also calling the cityWeather and fiveDayForecast functions
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    cities.push(city);
    cityWeather(city, APIKey);
    fiveDayForecast(city, APIKey);
  });

  //Function to get city weather
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
      // Logging the data in HTML
      var cityTemp = response.main.temp;
      var cityHumidity = response.main.humidity;
      var cityWind = response.wind.speed;
      var icon = response.weather[0].icon;
      lat = response.coord.lat;
      lon = response.coord.lon;
      console.log(icon);
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      $(".city-name").text(city + " " + "(" + date + ")");
      $("#icon").attr("src", iconurl);
      $("#cityTemp").text("Temperature: " + cityTemp + " F");
      $("#cityHumid").text("Humidity: " + cityHumidity + " %");
      $("#cityWind").text("Wind Speed: " + cityWind + " MPH");
      calculateUV(lat, lon);
      renderPastSerachButton();
      storeSearch();
    });
  }
  //Creating function to retrieve 5 day forcast data
  function fiveDayForecast(city, APIKey) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
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
      var icon = response.list[4].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      var newDate = moment().add(1, "days").format("l");
      var humidity = response.list[4].main.humidity;
      var temp = response.list[4].main.temp;
      $(".day-one-img").attr("src", iconurl);
      $(".day-one-date").text(newDate);
      $(".day-one-temp").text("Temp: " + temp + " F");
      $(".day-one-humidity").text("Humidity: " + humidity + " %");

      // Day Two Forecast
      var icon = response.list[12].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      var newDate = moment().add(2, "days").format("l");
      var humidity = response.list[12].main.humidity;
      var temp = response.list[12].main.temp;
      $(".day-two-img").attr("src", iconurl);
      $(".day-two-date").text(newDate);
      $(".day-two-temp").text("Temp: " + temp + " F");
      $(".day-two-humidity").text("Humidity: " + humidity + " %");

      //Day Three Forecast
      var icon = response.list[20].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      var newDate = moment().add(3, "days").format("l");
      var humidity = response.list[20].main.humidity;
      var temp = response.list[20].main.temp;
      $(".day-three-img").attr("src", iconurl);
      $(".day-three-date").text(newDate);
      $(".day-three-temp").text("Temp: " + temp + " F");
      $(".day-three-humidity").text("Humidity: " + humidity + " %");

      //Day Four Forecast
      var icon = response.list[28].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      var newDate = moment().add(4, "days").format("l");
      var humidity = response.list[28].main.humidity;
      var temp = response.list[28].main.temp;
      $(".day-four-img").attr("src", iconurl);
      $(".day-four-date").text(newDate);
      $(".day-four-temp").text("Temp: " + temp + " F");
      $(".day-four-humidity").text("Humidity: " + humidity + " %");

      //   Day Five Forecast
      var icon = response.list[36].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";
      var newDate = moment().add(5, "days").format("l");
      var humidity = response.list[36].main.humidity;
      var temp = response.list[36].main.temp;
      $(".day-five-img").attr("src", iconurl);
      $(".day-five-date").text(newDate);
      $(".day-five-temp").text("Temp: " + temp + " F");
      $(".day-five-humidity").text("Humidity: " + humidity + " %");
    });
  }
  //This functions gets the UV data grabbing lat and lon from ciyyWeather().
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
  //   This function renders the last searched buttons
  function renderPastSerachButton() {
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
  $(".city-btn").on("click", ".city", function (event) {
    event.preventDefault();
    var city = $(this).attr("data-name");
    // var city = $(this).text();

    console.log(city);
    cityWeather(city, APIKey);
  });
  function storeSearch() {
    localStorage.setItem("city", JSON.stringify(cities));
  }
  function lastSearch() {
    if (cities[0] == "null") {
      console.log("do nothing!");
    } else {
      console.log(cities[0]);
      cityWeather(cities[0], APIKey);
      fiveDayForecast(cities[0], APIKey);
    }
  }
});
