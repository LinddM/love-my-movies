from flask import Flask, render_template, url_for
import requests
import redis

app = Flask(__name__)

# API info
discover_url = 'https://api.themoviedb.org/3/discover/movie?api_key=4fc52af49a78473fd64a96b128b0f0cc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
discover_info = requests.get(discover_url)
discover = discover_info.json()

trending_url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=4fc52af49a78473fd64a96b128b0f0cc'
trending_info = requests.get(trending_url)
trending = trending_info.json()

# redis stuff
client = redis.StrictRedis(host='192.168.99.100', port=6379)

for movie in discover['results']:
    client.hmset(movie['title'], {'date' : movie['release_date'],'overview' : movie['overview'], 'vote' : movie['vote_count']})

for movie in trending['results']:
    client.hmset(movie['title'], {'date' : movie['release_date'],'overview' : movie['overview'], 'vote' : movie['vote_count']})


@app.route('/')
def index():
    return render_template('index.html', discover = discover, trending = trending)

if __name__ == '__main__':
    app.run(debug=True)