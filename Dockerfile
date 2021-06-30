FROM node:14-alpine3.13 as api

RUN mkdir /build
COPY ${CI_PROJECT_NAME}.tar.gz /build/
WORKDIR /build
RUN tar xvzf ${CI_PROJECT_NAME}.tar.gz
RUN npm install
RUN npm install -D typescript
RUN npm install -D terser
RUN npx tsc
WORKDIR dist
RUN npx terser ${CI_PROJECT_NAME}.js --compress --mangle --ecma 2020 -o ${CI_PROJECT_NAME}-min.js

FROM node:14-alpine3.13
ENV NPM_CONFIG_LOGLEVEL info
WORKDIR /home/node
COPY package.json ./
COPY --from=api /build/dist/ ./
RUN npm install --production
RUN npm install -D request

EXPOSE 3000/tcp
