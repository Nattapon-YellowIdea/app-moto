# build stage
FROM node:16.14.0-alpine as build-stage

WORKDIR /app


# RUN apk update
RUN apk add --no-cache \
        python2 nginx git
        
COPY . .
COPY ./nginx/default.conf /etc/nginx/nginx.conf
RUN npm install

EXPOSE 80
CMD ["sh","-c","npm run build && nginx -g 'daemon off;'"]
