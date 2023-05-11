FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/angularstore /usr/share/nginx/html