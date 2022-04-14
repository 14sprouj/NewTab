<!DOCTYPE html>
<html lang="en">

<head>
	<script>
		<?
		// read .env file
		$env = file_get_contents('.env');
		$env = explode("\n", $env);
		foreach ($env as $line) {
			// explode line by =
			$line = explode('=', $line);
			if (count($line) == 2) {
				// if var contains "
				if (strpos($line[1], ',') !== false) {
					// convert to array
					$line[1] = explode(',', $line[1]);
					echo 'var ' . $line[0] . ' = [';
					$i = 0;
					foreach ($line[1] as $value) {
						if ($i > 0) {
							echo ',';
						}
						echo '"' . $value . '"';
						$i++;
					}
					echo '];';
				} else {
				// set variable
				echo 'var ' . $line[0] . ' = "' . $line[1] . '";';
				}
			}
		}
		?>
	</script>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>New Tab</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<meta http-equiv="refresh" content="720">
	<script src="https://kit.fontawesome.com/e8abc56752.js" crossorigin="anonymous"></script>
</head>

<body>
	<div id="weather" class="hover-dropdown">
		<div id="weatherOverview">
			<img src="" id="weatherIcon">
			<div id="temperature"></div>
		</div>
		<div class="dropdown-content">
			<div id="description"></div>
			<div id="humidity"></div>
			<div id="wind"></div>
			<div id="sunTimes">
				<div id="sunrise">
					<i class="fa-solid fa-sunrise"></i>
					<div class="time"></div>
				</div>
				<div id="sunset">
					<div class="time"></div>
				</div>
			</div>
			<button id="weatherSeeMore" class="hover-dropdown">See more</button>
		</div>
	</div>
	<link rel="stylesheet" href="weather.css">
	<style>
		#weather {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			z-index: 1;
		}

		#weatherOverview {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-family: "Open Sans", sans-serif;
		}

		#weatherIcon {
			height: 9vh;
		}

		#temperature {
			font-size: 20px;
		}

		#weather div.dropdown-content {
			display: flex;
			flex-direction: column;			
		}

		#weather:hover div.dropdown-content {
			display: flex;
		}

		#weather div.dropdown-content div {
			    display: flex;
    justify-content: space-between;
    flex-direction: row;
		}
	</style>
	<div id="time"></div>
	<div id="greeting"></div>

	<script>
		function getTime() {
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			if (h < 12) {
				$("#greeting").html("Good Morning, " + name);
			} else if (h < 18) {
				$("#greeting").html("Good Afternoon, " + name);
			} else {
				$("#greeting").html("Good Evening, " + name);
			}
			var ampm = h >= 12 ? 'PM' : 'AM';
			h = h % 12;
			h = h ? h : 12;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			var time = h + ':' + m + ':' + s + ' ' + ampm;
			document.getElementById('time').innerHTML = time;
			//$('#time').html(time);
		}
		setInterval(getTime, 99);

		// get lat and lon
		console.log(lat, lon);
		function getWeatherData() {
			// Get Weather for lat long
			$.ajax({
				url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=c74d258583fbcda87446eb08a4bfb26b&units=metric",
				dataType: "json",
				success: function (weather) {
					document.getElementById("weatherIcon").src = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";
					document.getElementById("weatherIcon").alt = weather.weather[0].name;
					console.log(weather);
					console.log(weather.weather[0].description);
					console.log(weather.weather[0].icon);
					document.getElementById("temperature").innerHTML = weather.main.temp + "&deg;C";
					$('#humidity').html(weather.main.humidity);
					$('#wind').html(weather.wind.speed);
					var sunrise = new Date(weather.sys.sunrise * 1000);
					// pad with 0
					var hr = sunrise.getHours();
					var min = sunrise.getMinutes();
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
					$('#sunset .time').html(sunset.getHours() + ":" + pad(sunset.getMinutes(),2));
					$('#description').html(weather.weather[0].description);
				}
			});
		}
		getWeatherData();
		setInterval(getWeatherData, 1800000);

		// when document is ready
		$(document).ready(function () {
			// get time
			getTime();
			// get weather
			getWeatherData();
			// get timezone
			$.ajax({
				url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lon + "&timestamp=" + Date.now() + "&key=" + apiKey,
				dataType: "json",
				success: function (timezone) {
					console.log(timezone);
					console.log(timezone.timeZoneId);
					console.log(timezone.timeZoneName);
					console.log(timezone.rawOffset);
					console.log(timezone.dstOffset);
				}
			});
		});
					
		
	</script>
	<style>
		body {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			height: 100vh;
			width: 100vw;
			background-color: #f5f5f5;
			overflow: hidden;
			margin: 0;
		}

		#time {
			font-size: 50px;
			font-family: 'Arial';
			color: #000;
		}

		#greeting {
			font-size: 30px;
			font-family: 'Arial';
			color: #000;
		}
	</style>
</body>

</html>