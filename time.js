if (clockMode == "12h") {
	function getTime() {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		if (h < 12) {
			$("#timezone").html("Good Morning");
		} else if (h < 18) {
			$("#timezone").html("Good Afternoon");
		} else {
			$("#timezone").html("Good Evening");
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
			$("#timezone").html("Good Morning");
		} else if (h < 18) {
			$("#timezone").html("Good Afternoon");
		} else {
			$("#timezone").html("Good Evening");
		}
		h = h < 10 ? '0' + h : h;
		m = m < 10 ? '0' + m : m;
		s = s < 10 ? '0' + s : s;
		var time = h + ':' + m + ':' + s;
		document.getElementById('time').innerHTML = time;
	}
} else if (clockMode == "ias") {
	var iasClock = document.createElement("div");
	iasClock.id = "iasClock";
	document.getElementById("time").appendChild(iasClock);
	var iasHourOuterBar = document.createElement("div");
	iasHourOuterBar.setAttribute("id", "iasHourOuterBar");
	iasHourOuterBar.setAttribute("class", "iasOuterBar");
	iasClock.appendChild(iasHourOuterBar);
	var iasHourInnerBar = document.createElement("div");
	iasHourInnerBar.setAttribute("id", "iasHourInnerBar");
	iasHourInnerBar.setAttribute("class", "iasInnerBar");
	iasHourOuterBar.appendChild(iasHourInnerBar);
	var iasHourText = document.createElement("div");
	iasHourText.setAttribute("id", "iasHourText");
	iasHourText.classList.add("iasBarText");
	iasHourText.style.top = document.getElementById("iasHourOuterBar").offsetTop + "px";
	iasHourOuterBar.appendChild(iasHourText);
	iasHourText.style.height = document.getElementById("iasHourOuterBar").offsetHeight + "px";
	iasHourOuterBar.appendChild(iasHourText);
	var iasMinuteOuterBar = document.createElement("div");
	iasMinuteOuterBar.setAttribute("id", "iasMinuteOuterBar");
	iasMinuteOuterBar.setAttribute("class", "iasOuterBar");
	iasClock.appendChild(iasMinuteOuterBar);
	var iasMinuteInnerBar = document.createElement("div");
	iasMinuteInnerBar.setAttribute("id", "iasMinuteInnerBar");
	iasMinuteInnerBar.setAttribute("class", "iasInnerBar");
	iasMinuteOuterBar.appendChild(iasMinuteInnerBar);
	var iasMinuteText = document.createElement("div");
	iasMinuteText.setAttribute("id", "iasMinuteText");
	iasMinuteText.classList.add("iasBarText");
	iasMinuteOuterBar.appendChild(iasMinuteText);
	var iasSecondOuterBar = document.createElement("div");
	iasSecondOuterBar.setAttribute("id", "iasSecondOuterBar");
	iasSecondOuterBar.setAttribute("class", "iasOuterBar");
	iasClock.appendChild(iasSecondOuterBar);
	var iasSecondInnerBar = document.createElement("div");
	iasSecondInnerBar.setAttribute("id", "iasSecondInnerBar");
	iasSecondInnerBar.setAttribute("class", "iasInnerBar");
	iasSecondOuterBar.appendChild(iasSecondInnerBar);
	var iasSecondText = document.createElement("div");
	iasSecondText.setAttribute("id", "iasSecondText");
	iasSecondText.classList.add("iasBarText");
	iasSecondOuterBar.appendChild(iasSecondText);

	function getTime() {
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();

		iasHourInnerBar.style.width = h / 24 * 100 + "%";
		iasHourText.innerHTML = h + " hours";
		iasMinuteInnerBar.style.width = m / 60 * 100 + "%";
		iasMinuteText.innerHTML = m + " minutes";
		iasSecondInnerBar.style.width = s / 60 * 100 + "%";
		iasSecondText.innerHTML = s + " seconds";
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