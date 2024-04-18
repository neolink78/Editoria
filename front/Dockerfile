FROM node:18-alpine as base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

FROM base as dev
CMD npm run dev

FROM base as prod
RUN npm run build
CMD npm run start
