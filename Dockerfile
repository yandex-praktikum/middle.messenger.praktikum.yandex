FROM node:18.12.1

WORKDIR /docker-image

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "server.ts"]

EXPOSE 3000
