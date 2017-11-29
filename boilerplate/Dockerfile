FROM node:8.9.0-alpine

MAINTAINER maifuquan <maifuquan@ciwong.com>

# Install base packages, set timezone
RUN apk update && apk add curl bash tree tzdata 
# \
#    && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN npm config set registry http://registry.npm.taobao.org

RUN mkdir -p /var/app

WORKDIR /var/app

COPY ./package.json /var/app

RUN npm install

COPY . /var/app

ENV NODE_ENV production
ENV EGG_SERVER_ENV prod
ENV TZ Asia/Shanghai

VOLUME /var/app/logs

EXPOSE 7001

ENTRYPOINT npm start