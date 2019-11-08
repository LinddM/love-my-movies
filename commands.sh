docker pull redis
docker run -d --name mov -p 6379:6379 redis
docker pull lindseymaite/love-my-movies:3.0
docker run -it -p 5000:5000 lindseymaite/love-my-movies:3.0