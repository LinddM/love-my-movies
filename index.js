const express = require('express')
const app = express()
var path = require('path')
const Mustache = require('mustache')
const fs = require('fs')
const axios = require('axios');


app.get('/', function (req, res) {
    const template = fs.readFileSync('templates/card.html', 'utf8');
    const index = fs.readFileSync('templates/index.html', 'utf8');
    

    // Make a request for a user with a given ID
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=4fc52af49a78473fd64a96b128b0f0cc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        .then(function (response) {
            // handle success
            console.log(response.data.results);
            const movies = response.data.results
            const renderedCards = Mustache.render(template, {movies: movies})
            const renderedIndex = Mustache.render(index, {'cards': renderedCards})

            res.status(200).send(renderedIndex)
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    
  })

app.use(express.static(path.join(__dirname, 'templates')))
 
console.log('Server running on port 3000')
app.listen(3000)