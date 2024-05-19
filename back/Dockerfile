FROM node:18-alpine as base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM base as dev
CMD npm run dev

FROM base as ci
CMD npm run test

FROM base as prod
CMD npm run start