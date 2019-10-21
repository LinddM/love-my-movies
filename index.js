const express = require('express')
const app = express()
var path = require('path')
const Mustache = require('mustache')
const fs = require('fs')
const axios = require('axios');

var redis = require('redis');
var client = redis.createClient(6379, '192.168.99.100');

client.on("error", function (err) {
    console.log("Error " + err);
});

//  create key and set value
client.set("string key", "xxx", redis.print);


app.get('/', function (req, res) {
    const template = fs.readFileSync('templates/card.html', 'utf8');
    const index = fs.readFileSync('templates/index.html', 'utf8');
    

    // Make a request for a user with a given ID
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=4fc52af49a78473fd64a96b128b0f0cc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        .then(function (response) {
            let movies = response.data.results
            for (let i = 0; i< response.data.results.length; i++) {
                client.setnx(response.data.results[i].id, 0, redis.print);
            }
            
            // handle success
            console.log(movies);            
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

    
  }
)

app.patch('/movie/:movie/:vote', function (req, res) {
    const movie = req.params.movie
    const vote = req.params.vote
    
    client.get(movie, (err, reply) => {
        if (err) {
            console.error(err)
            res.status(500).send(false)
        }
        console.log(reply)
        client.set(movie, parseInt(reply) + parseInt(vote), redis.print);
        
        res.status(200).send(true)
    })
})

app.use(express.static(path.join(__dirname, 'templates')))
 
console.log('Server running on port 3000')
app.listen(3000)