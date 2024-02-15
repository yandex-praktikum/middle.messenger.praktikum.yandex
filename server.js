import express from 'express';
import http from 'http';
const app = express();
const port = 3000;

app.use(express.static('./dist'));

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`server started on ${port}`);
})
