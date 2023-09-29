FROM node:latest

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200 49153
CMD npm run start

