const http = require('http');
const app = require('./app');
const port = process.env.Port || 5000

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})