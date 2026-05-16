### STAGE 1:BUILD ###
FROM node:latest AS build

WORKDIR /dist/regnerdetnu

RUN npm cache clean --force
RUN npm install -g yarn
RUN npm install -g "@angular/cli@latest"

COPY . .
RUN yarn install
RUN ng build

### STAGE 2:RUN ###
FROM nginx:latest AS ngi

COPY --from=build /dist/regnerdetnu/dist/regnerdetnu/browser /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/config/dist.runtime.config.json > /usr/share/nginx/html/assets/config/runtime.config.json && exec nginx -g 'daemon off;'"]
