require('dotenv').config()
const http = require('http');

const {
    app
} = require('./app');

let server = http.createServer(app);
server.listen(process.env.PORT,()=>{
    console.log(`The app listening on ${process.env.PORT}`)
})