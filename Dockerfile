FROM node:lts-alpine3.15 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:prod


FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/shop-web /usr/share/nginx/html
