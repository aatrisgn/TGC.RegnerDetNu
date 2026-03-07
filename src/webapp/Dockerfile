### STAGE 1:BUILD ###
FROM node:latest AS build

WORKDIR /dist/regnerdetnu

RUN npm cache clean --force

COPY . .
RUN yarn install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS ngi

COPY --from=build /dist/regnerdetnu/dist/regnerdetnu /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
