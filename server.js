const http = require('http')
const app = require('./app.js')
const DB_PORT = process.env.PORT || 4000;

const server = http.createServer(app)

server.listen(DB_PORT, () => {
    console.log(`server is listening on ${DB_PORT} ....`)
})