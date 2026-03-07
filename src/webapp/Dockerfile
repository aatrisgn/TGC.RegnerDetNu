### STAGE 1:BUILD ###
FROM node:latest AS build

WORKDIR /dist/regnerdetnu

RUN npm cache clean --force

COPY . .
RUN yarn install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS ngi
#COPY --from=build /dist/src/app/wwwroot/assets/config /usr/share/nginx/html/assets/config

COPY --from=build /dist/src/app/dist/asgerthyregoddk/browser /usr/share/nginx/html
#COPY --from=build /dist/src/app/wwwroot/assets/config/runtime.config.json /usr/share/nginx/html/assets/config/runtime.config.json

COPY /nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/config/dist.runtime.config.json > /usr/share/nginx/html/assets/config/runtime.config.json && exec nginx -g 'daemon off;'"]
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
