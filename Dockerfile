# development mode

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

# production mode

FROM node:18-alpine AS production

ARG NODE_ENV=production

ENV  NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]