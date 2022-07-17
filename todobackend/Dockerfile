FROM node:18-alpine3.15

WORKDIR /app

RUN npm install -g ts-node
RUN npm install -g typescript

RUN yarn

ENTRYPOINT [ "yarn", "start"]