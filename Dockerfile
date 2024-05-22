
FROM node:20.9.0-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

RUN npm run build

CMD ["node", "dist/main.js"]

