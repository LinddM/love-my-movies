var data = "{}";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    // console.log(this.responseText);
    // test: getting info from discover-movies
    let info = JSON.parse(this.responseText)
    movies = info['results']
    for(let i = 0; i < movies.length; i++){
      console.log(movies[i]['title'])
      console.log(movies[i]['poster_path'])
      console.log(movies[i]['overview'])
    }
  }
});

xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1");

xhr.send(data);

// manejar esto con 
// https://developers.themoviedb.org/3/getting-started/introduction
