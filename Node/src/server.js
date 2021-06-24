//<Imported from package.json>

import express from "express";

import cors from "cors";

import listEndpoints from "express-list-endpoints";

// </>

import authorsRouter from "./authors/index.js";

const server = express();

const PORT = 3001;

server.use(cors());

server.use(express.json());

server.use("/authors", authorsRouter);
//e.g
// http://localhost:3001/middleware?number=5
// in our request we reference our middleware function
//with a query number with the value of 5
// server.use('/middleware',(req,res,next)=>{
//   let {number} = req.query; 
//   number = parseInt(number)
//   req.number = number //req number = 5
//   next() //calls the next middleware function after this one
// },
//   (req, res, next) =>{
//     req.number++ //adds 1 to our initial value of 5 to become 6
//     console.log(req.number) //req
//     next()//next middleware function 
//   },
//   (req, res, next) =>{
//     req.number++ //adds another 1 to our initial value of 5 to become 7
//     console.log(req.number)
//     next()//next middleware function 
//   },
//   (req, res, next) =>{
//     req.number++ //then another 1 to our initial value of 5 to become 8
//     req.number +=30 //then we add 30 which now make 38
//     next()//next middleware function 
//     },
//      (req, res, next) =>{ // last middleware function
//       res.send({number:req.number}) //Sends a response
//       }
// )

console.log(listEndpoints(server));

server.listen(PORT, () => console.log("✅ Server is running on port : ", PORT));

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
