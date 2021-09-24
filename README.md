# OpenDataProject

This is an e-government project for providing online services to citizens

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Angular dependancies.  
Use the package manager [composer](https://getcomposer.org/) to install Laravel dependancies.  
Use the package manager [pip](https://pypi.org/project/pip/) to install Flask dependancies.  
For installing dependancies and running services :
Navigate to api folder and run : 
```bash
composer install
php artisan serve # on port 8000
```
Navigate to web folder and run : 
```bash
npm install
ng serve # on port 4200
```
Navigate to classifier/src folder and run : 
```bash
pip install Flask
python api.py # on port 5000
```

## Usage

For testing this application import the following [database](https://we.tl/t-bmSvUCNrkU).  
Login as a SuperAdmin :  
Username : SuperAdmin@gmail.com  
Password : aaaa

Login as a user :  
Username : User1@gmail.com  
Password : aaaa 


## Dockerization
### Building images :  
 ```bash
# Api Dockerfile (Available under Components/api/)
# use the official PHP image as base image
FROM php:7 as base
# copy the Composer PHAR from the Composer image into the PHP image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# show that both Composer and PHP run as expected
RUN apt-get update
RUN docker-php-ext-install pdo pdo_mysql
RUN apt install zip unzip
FROM base as develop
# Install dependencies
WORKDIR /app
COPY . /app
RUN composer install
EXPOSE 8000
ENTRYPOINT ["/app/run.sh"]

```
 ```bash
# Web Dockerfile (Available under Components/web/)
FROM node:14 as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
FROM base as build
COPY . .
RUN yarn build
FROM nginx:alpine
COPY --from=build /app/dist/crc-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

```
 ```bash
# Classifier Dockerfile (Available under Components/classifier/)
FROM tensorflow/tensorflow:2.6.0 as base
WORKDIR /app

ADD requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV MODEL_PATH=/app/models/v0/model.h5
ENV TOKENIZER_PATH=/app/models/v0/tokenizer.pickle

CMD python src/api.py

```
Navigate in root folder
```bash
Docker-compose up --build
```
### Or Pull prebuilt images :
 PS: All Docker images are available on my [DockerHub](https://hub.docker.com/repository/docker/alibh7/web)  

 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
