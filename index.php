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
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<div id="weather" class="hover-dropdown">
		<div id="weatherOverview">
			<img src="" id="weatherIcon">
			<div id="temperature"></div>
		</div>
		<div id="weatherDetails" class="dropdown-content">
			<div id="temperatures">
				<i class="fa-solid fa-temperature-arrow-up"></i>
				<div id="temperatureMax"></div>
				<i class="fa-solid fa-temperature-arrow-down"></i>
				<div id="temperatureMin"></div>
			</div>
			<div id="description"></div>
			<div id="wind">
				<i class="fa-solid fa-wind"></i>
				<div id="windSpeed"></div>
				<div id="windDirection"></div>
			</div>
			<div id="sunTimes">
				<div id="sunrise">
					<i class="fa-solid fa-sunrise"></i>
					<div class="time"></div>
				</div>
				<div id="sunset">
					<i class="fa-solid fa-sunset"></i>
					<div class="time"></div>
				</div>
			</div>
			<div id="weatherSeeMore" class="hover-dropdown">
				<span id="btnWeatherSeeMore">See more</span>
				<div id="weatherMore">
					Humidity <div id="humidity"></div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div id="time"></div>

<script>
	console.log(clockMode);
	if (clockMode == "12h") {
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
		}
	} else if (clockMode == "24h") {
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
			h = h < 10 ? '0' + h : h;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			var time = h + ':' + m + ':' + s;
			document.getElementById('time').innerHTML = time;
		}
	} else if (clockMode == "bar") {
		var outerBar = document.createElement("div");
			outerBar.setAttribute("id", "outerTimeBar");
		document.getElementById("time").appendChild(outerBar);
					var bar = document.createElement("div");
bar.setAttribute("id", "timeBar");
		outerBar.appendChild(bar);
		var timeBarPercentTxt = document.createElement("p");
timeBarPercentTxt.setAttribute("id", "timeBarPercentTxt");
		outerBar.appendChild(timeBarPercentTxt);

		function getTime() {
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();

			var nowSecs = h * 3600 + m * 60 + s;
			var nowTimePercent = nowSecs / 86400 * 100;
			var bar = document.getElementById("timeBar");
			bar.style.width = nowTimePercent + "%";

			var timeBarPercentTxt = document.getElementById("timeBarPercentTxt");
			timeBarPercentTxt.innerHTML = nowTimePercent.toFixed(5) + "%";
		}
	}
	setInterval(getTime, 9);
</script>

	<div id="greeting"></div>

	<script src="weather.js"></script>
	<script>
		
		

		// get lat and lon
		console.log(lat, lon);

		// when document is ready
		//$(document).ready(function () {
			// get time
			try {
				getTime();
			} catch (error) {
				console.log(error);				
			}
			
			// get weather
			try {
				getWeatherData();
			} catch (error) {
				console.log(error);
			}
					
		
	</script>
</body>

</html>