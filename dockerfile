FROM node:12.18.1
EXPOSE 8080

WORKDIR /app
COPY . /app

RUN npm install --omit=dev

CMD [ "npm", "start" ]