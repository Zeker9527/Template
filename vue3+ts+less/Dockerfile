FROM nginx:latest

LABEL version=<VSERSION>
COPY ./default.conf /etc/nginx/conf.d/default.conf

ADD ./dist/ /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

EXPOSE 80
