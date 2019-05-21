FROM node:alpine

COPY *.js ./
COPY *.json ./
RUN npm install

ENV NPM_CONFIG_LOGLEVEL info

ENTRYPOINT ["node","index.js"]
