FROM node:20-alpine

WORKDIR /app

COPY . /app/

RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD npm start
