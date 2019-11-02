FROM python:alpine3.7

WORKDIR /movies-project

COPY . /movies-project

RUN pip requirements.txt

CMD [ "python", "app.py" ]