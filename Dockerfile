FROM node:10

MAINTAINER Matheus Marchini <mat@mmarchini.me>

COPY . /app
WORKDIR /app

RUN apt-get update && npm ci && npx webpack

CMD ["node", "index.js"]
