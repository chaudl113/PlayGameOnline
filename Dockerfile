FROM node:lts-alpine

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /app

VOLUME /app/game

VOLUME /app/dist/public/images

VOLUME /app/public


COPY ./package*.json ./

RUN npm install

COPY views /app/views

COPY dist /app/dist

COPY src/public dist/public




EXPOSE 8000 8010



