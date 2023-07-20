FROM ubuntu:20.04 AS build-env
WORKDIR /app
COPY . .

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get install curl -y

ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH

RUN curl https://get.volta.sh | bash

RUN npm install
ENV NODE_ENV production
RUN npm run build
RUN rm -rf node_modules
RUN npm ci --omit=dev


FROM gcr.io/distroless/nodejs:18
# FROM node:16-alpine3.14
WORKDIR /app
COPY --from=build-env /app/dist /app/dist
COPY --from=build-env /app/node_modules /app/node_modules
CMD ["dist/main.js"]