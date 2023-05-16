FROM node:16-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add bash && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

RUN npm install

EXPOSE 3000

CMD npm run dev
