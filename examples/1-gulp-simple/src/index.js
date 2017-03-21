"use strict";

var app, intervalID;

function ready() {

	app = document.querySelector('.app');

	function now() {
		app.childNodes[0].textContent = (new Date()).toString();
	};

	intervalID = window.setInterval(now, 500)

}

document.addEventListener("DOMContentLoaded", ready);
