const app = require('./app/app');
const http = require('http');
const port = process.env.PORT
const server = http.createServer(app)
const startServer = async () => {
    server.listen(port , ()=> {
        console.log(`Server running ... 😎 😎`)
    })
}
startServer()