FROM node:10.15.2-jessie-slim

EXPOSE 3030

WORKDIR /usr/src/app

COPY . .

RUN npm install \
  && npm cache clean --force

CMD [ "npm", "start" ]
