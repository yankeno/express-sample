FROM mysql:5.7

ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_ROOT_PASSWORD
ARG TZ

ENV MYSQL_DATABASE=${MYSQL_DATABASE} \
  MYSQL_USER=${MYSQL_USER} \
  MYSQL_PASSWORD=${MYSQL_PASSWORD} \
  MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
  TZ=${TZ}

COPY ./my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
