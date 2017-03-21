export default function now() {
    var app = document.querySelector('.app');
    app.childNodes[0].textContent = (new Date()).toString();
};
