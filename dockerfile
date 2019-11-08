FROM python:alpine3.7

WORKDIR /movies-project

COPY . /movies-project

RUN pip install -r requirements.txt

CMD [ "python", "app.py" ]