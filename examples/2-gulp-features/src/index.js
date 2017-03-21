"use strict";

var app, intervalID;

function ready() {
    app = document.querySelector('.app');
    intervalID = window.setInterval(now, 500)

}

document.addEventListener("DOMContentLoaded", ready);
