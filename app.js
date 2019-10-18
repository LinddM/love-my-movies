var data = "{}";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.themoviedb.org/3/movie/336843?language=en-US&api_key=");

xhr.send(data);

// manejar esto con 
// https://developers.themoviedb.org/3/getting-started/introduction