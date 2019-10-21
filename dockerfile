FROM node:10.8.0-alpine

WORKDIR /movies-project

COPY . /movies-project

RUN npm install 

EXPOSE 3000

CMD [ "node", "index.js" ]