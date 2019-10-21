FROM node:10

WORKDIR /movies-project

COPY . /movies-project

RUN npm install 

EXPOSE 3000

CMD [ "node", "index.js" ]