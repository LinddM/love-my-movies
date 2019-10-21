docker pull redis
docker run -d -p 6379:6379 --name redis1 redis
docker pull lindseymaite/love-my-movies:2.1
docker run -it -p 3000:3000 lindseymaite/love-my-movies:2.1