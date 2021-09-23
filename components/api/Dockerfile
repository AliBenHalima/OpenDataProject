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
