FROM node:14-alpine

RUN mkdir -p /usr/src/learning_backend
WORKDIR /usr/src/learning_backend 

COPY package.json .
COPY package-lock.json .
COPY .env .env

RUN npm install

COPY lib lib
COPY router router
COPY indexwithdb.js indexwithdb.js

EXPOSE 3000
CMD npm run dev2