#!/bin/sh

cd /app
php artisan wait_db
php artisan config:cache
php artisan migrate --force -vvv
php artisan passport:install --uuids
php artisan passport:keys --force
php artisan passport:client --personal --force
php artisan vendor:publish --tag=passport-config
php artisan vendor:publish --tag=passport-migrations
php artisan storage:link
php artisan db:seed
php artisan serve --host 0.0.0.0 --port=8000 -vvv

