FROM node:15.0.0

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD [npm, start]