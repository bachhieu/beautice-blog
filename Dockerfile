FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
WORKDIR /usr/src/app
ARG PORT=3000
EXPOSE $PORT

CMD [ "npm", "start" ]
