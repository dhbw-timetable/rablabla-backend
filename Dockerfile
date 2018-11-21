FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir -p /usr/local/share/rablabla && npm install && npm i -g swagger

COPY . .
COPY generateICS.js /usr/local/share/rablabla/

EXPOSE 10010
CMD [ "swagger", "project", "start" ]
