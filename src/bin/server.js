const app = require('../app');
const http = require('http');

const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, ()=>{
    console.log('API is running on port:%d', port);
});