FROM node:17
WORKDIR /usr/src/app
COPY ./ksdd-view/package*.json ./
RUN npm install
COPY ./ksdd-view .
EXPOSE 8080
