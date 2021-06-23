import express from "express"

//fs = file system
import fs from "fs"

import uniqid from "uniqid"

import path, {dirname} from "path"

import {fileURLToPath} from "url"

//Get filename
const __filename =  fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const authorsFilePath = path.join(__dirname, 'authors.json')

const router = express.Router()

//get all authors
router.get("/", async(req, res, next) => {
    try{
        const fileAsBuffer = fs.readFileSync(authorsFilePath);
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)//Passes a JSON string, constructing the javascript value
        res.send(fileAsJson)
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


//get single author
router.get("/:id", async(req, res, next) => {
    try{
        const fileAsBuffer = fs.readFileSync(authorsFilePath);
        
        const fileAsString = fileAsBuffer.toString()
        
        const fileAsJSONArray =  JSON.parse(fileAsString)
        
        const author = fileAsJsonArray.find(
            (author) => author.id === req.params.id
        );
        if(!author){
            res
            .status(400)
            .send({message:`Author with ${req.params.id} is not found!`});
        }
        res.send(author)
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


// create author
router.post("/", async(req, res, next) => {
    try{
        const {name, surname, email, dateOfBirth} = req.body;
        const author = {
            id: uniqid(),
             name, 
             surname,
              email,
               dateOfBirth,
               avatar:`https://eu.ui-avatars.com/api/?name=${name}+${surname}`,
                createdAt:new Date(),
                updatedAt:new Date()
        };

        //Code below reads the file
        const fileAsBuffer = fs.readFileSync(authorsFilePath);
        
        const fileAsString = fileAsBuffer.toString();
        
        const fileAsJSONArray = JSON.parse(fileAsString);
        
        fileAsJSONArray.push(author);
        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
        res.send(author);
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


// delete author
// router.delete("/:id", async(req, res, next) => {
//     try{
//     }
//     catch(error){
//         res.send(500).send({message:error.message});
//     }
// })


// update author
// router.put("/:id", async(req, res, next) => {
//     try{
//     }
//     catch(error){
//         res.send(500).send({message:error.message});
//     }
// })
export default router

