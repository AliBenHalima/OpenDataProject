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
