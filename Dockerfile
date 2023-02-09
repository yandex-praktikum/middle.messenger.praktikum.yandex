
FROM node:16.17.1
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run server
