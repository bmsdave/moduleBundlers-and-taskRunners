import './index.html';
import './index.less';
import now from './app/app';

var intervalID;

function ready() {
    intervalID = window.setInterval(now, 500)
}

document.addEventListener("DOMContentLoaded", ready);
