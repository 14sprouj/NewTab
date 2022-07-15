function getWeatherData() {
	var night = false;
	// Get Weather for lat long
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherMapKey + "&units=" + weatherUnits + "&exclude=minutely,hourly",
		//dataType: "json",
		success: function (weatherData) {
			//console.log(weatherAPIurl);
			document.getElementById("weatherIcon").src = "https://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + ".png";
			if (weatherData.current.weather[0].icon.charAt(weatherData.current.weather[0].icon.length - 1) == "n") {
				night = true;
				document.getElementById("weatherOverview").style.backgroundColor = "#0006";
				document.getElementsByTagName("body")[0].style.backdropFilter = "brightness(0.8) saturate(0.6)";
			}
			document.getElementById("weatherIcon").alt = weatherData.current.name;
			//console.log(weatherData);
			//console.log(weatherData.current.description);
			//console.log(weatherData.current.weather[0].icon);
			var temp = parseFloat(weatherData.current.temp);
			var tempMin = parseFloat(weatherData.daily[0].temp.min);
			var tempMax = parseFloat(weatherData.daily[0].temp.max);

			$('#humidity').html(weatherData.current.humidity + "%");

			if (weatherUnits == "metric") {
				$('#temperature').html(temp.toFixed(1) + "&deg;C");
				$('#temperatureMin').html(tempMin.toFixed(1) + "&deg;C");
				$('#temperatureMax').html(tempMax.toFixed(1) + "&deg;C");
				$('#windSpeed').html(weatherData.current.wind_speed + " m/s");
			} else if (weatherUnits == "imperial") {
				$('#temperature').html(temp.toFixed(1) + "&deg;F");
				$('#temperatureMin').html(tempMin.toFixed(1) + "&deg;F");
				$('#temperatureMax').html(tempMax.toFixed(1) + "&deg;F");
				$('#windSpeed').html(weatherData.current.wind_speed + " mph");
			}

			var now = new Date();
			var nowHr = now.getHours();
			var nowMin = now.getMinutes();

			var sunrisePassed, sunsetPassed = false;

			var sunrise = new Date(weatherData.current.sunrise * 1000);
			var hr = sunrise.getHours();
			var min = sunrise.getMinutes();
			if (hr < nowHr) {
				sunrisePassed = true;
			} else if (hr == nowHr) {
				if (min < nowMin) {
					sunrisePassed = true;
				}
			}
			var sec = sunrise.getSeconds();
			var ampm = hr >= 12 ? 'PM' : 'AM';
			hr = hr % 12;
			hr = hr ? hr : 12; // the hour '0' should be '12'
			min = min < 10 ? '0' + min : min;
			function pad(number, places) {
				var string = number.toString();
				while (string.length < places) {
					string = "0" + string;
				}
				return string;
			}
			$('#sunrise .time').html(sunrise.getHours() + ":" + pad(sunrise.getMinutes(), 2));

			var sunset = new Date(weatherData.current.sunset * 1000);
			var hr = sunset.getHours();
			var min = sunset.getMinutes();
			if (hr < nowHr) {
				sunsetPassed = true;
			} else if (hr == nowHr) {
				if (min < nowMin) {
					sunsetPassed = true;
				}
			}
			$('#sunset .time').html(sunset.getHours() + ":" + pad(sunset.getMinutes(), 2));
			if (sunrisePassed) {
				$('#sunrise').addClass('passed');
			}
			if (sunsetPassed) {
				$('#sunset').addClass('passed');
			}
			$('#description').html(weatherData.current.weather[0].description);
		}
	});
}
getWeatherData();
setInterval(getWeatherData, 1800000);