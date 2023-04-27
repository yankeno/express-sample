FROM node:14.15.3-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add bash

RUN npm install

EXPOSE 3000

CMD  npm start
