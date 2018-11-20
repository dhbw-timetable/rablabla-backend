FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir -p /usr/local/share/rablabla && npm install && npm i -g swagger

COPY . .

EXPOSE 10010
CMD [ "swagger", "project", "start" ]
