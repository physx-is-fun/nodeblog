// Import dependencies.
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
server.listen(process.env.PORT || 3000,() => console.log('Server is listening on port: ' + 3000));