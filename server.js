import path from'path';
import express from 'express';
import http from 'http';
const app = express();
const port = 3000;


app.use('/index.html', express.static('./index.html'));

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`server started on ${port}`);
})