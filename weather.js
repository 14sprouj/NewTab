function getWeatherData() {
	// Get Weather for lat long
	var weatherAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid="+openWeatherMapKey+"&units="+units+"&exclude=minutely,hourly";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid="+openWeatherMapKey+"&units="+units+"&exclude=minutely,hourly",
		//dataType: "json",
		success: function (weatherData) {
			console.log(weatherAPIurl);
			document.getElementById("weatherIcon").src = "https://openweathermap.org/img/wn/" + weatherData.current.icon + ".png";
			document.getElementById("weatherIcon").alt = weather.current[0].name;
			console.log(weather);
			console.log(weather.current[0].description);
			console.log(weather.weather[0].icon);
			//round to 1 decimal place
			var temp = parseFloat(weather.main.temp);
			var tempMin = parseFloat(weather.main.temp_min);
			var tempMax = parseFloat(weather.main.temp_max);
			$('#temperature').html(temp.toFixed(1) + "&deg;C");
			$('#temperatureMin').html(tempMin.toFixed(1) + "&deg;C");
			$('#temperatureMax').html(tempMax.toFixed(1) + "&deg;C");
			$('#humidity').html(weather.main.humidity + "%");
			$('#windSpeed').html(weather.wind.speed) + " m/s";

			var now = new Date();
			var nowHr = now.getHours();
			var nowMin = now.getMinutes();

			var sunrisePassed, sunsetPassed = false;

			var sunrise = new Date(weather.sys.sunrise * 1000);
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
			$('#sunrise .time').html(sunrise.getHours() + ":" + pad(sunrise.getMinutes(),2));
			var sunset = new Date(weather.sys.sunset * 1000);
			var hr = sunset.getHours();
			var min = sunset.getMinutes();
			if (hr < nowHr) {
				sunsetPassed = true;
			} else if (hr == nowHr) {
				if (min < nowMin) {
					sunsetPassed = true;
				}
			}
			$('#sunset .time').html(sunset.getHours() + ":" + pad(sunset.getMinutes(),2));
			if (sunrisePassed) {
				$('#sunrise').addClass('passed');
			}
			if (sunsetPassed) {
				$('#sunset').addClass('passed');
			}
			$('#description').html(weather.weather[0].description);
		}
	});
}
getWeatherData();
setInterval(getWeatherData, 1800000);