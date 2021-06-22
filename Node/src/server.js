import express from "express"

import cors from "cors"

import listEndpoints from "express-list-endpoints"

const server = express();
const PORT = 3001;

server.use(cors())

server.use(express.json())

console.log(listEndpoints(server));

server.use(PORT,() => console.log(`Server is running! on port : ${PORT}`))

server.on('error',(error)=>
console.log(`Server is not running due to : ${error}`)
)