//<Imported from package.json>

import express from "express";

//import middlewares
//</>

import {checkBlogPostSchema, checkValidationResult} from "./validation.js"

//The syntax consists of the keyword import, a dot, and the identifier meta ("import.meta").
// Normally the left-hand side of the dot is the object on which property access is performed,
// but here import is not really an object.
// console.log(import.meta); // { url: "file:///home/user/my-module.js" }

//import.meta returns an object with a url and referencing 
//import.meta.data means we are accessing the key value pairs of the url

const __filename = fileURLToPath(import.meta.url);
// console.log(__filename)

const __dirname = dirname(__filename);
import fs from "fs";//Import File system

import uniqid from "uniqid";

import path, { dirname } from "path";

import { fileURLToPath } from "url";
const blogsFilePath = path.join(__dirname, "blogs.json"); //This directs us to our file, blogs.json
const router = express.Router(); //Allows us to use router
//router syntax: router.METHOD(path, [callback, ...] callback)

// get all blogs
//Define the method after router in this case the "GET/get" method is being applied 
//You define routing using methods of the Express app object that correspond to HTTP methods;
// for example, app.get() to handle GET requests and app.post to handle POST requests
router.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath); //1.Read the file using fs.readFileSync
    const fileAsString = fileAsBuffer.toString(); //2. Convert the file to a string, "[]"
    const fileAsJSON = JSON.parse(fileAsString); //3. Convert to a JSON object
    res.send(fileAsJSON); //Sends our file to the server syntax:res.send(body)
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
//req = http request, res = http response, next = ?
// create  author
router.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;
    const author = {
      id: uniqid(),
        name,
          surname,
            email,
              dateOfBirth,
                avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
                  createdAt: new Date(),
                  updatedAt: new Date()
      };

    const fileAsBuffer = fs.readFileSync(blogsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    fileAsJSONArray.push(author);

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));

    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// get single blogs
router.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath); //1.Read the file using fs.readFileSync

    const fileAsString = fileAsBuffer.toString(); //2. Convert the file to a string, "[]"

    const fileAsJSONArray = JSON.parse(fileAsString); //3. Convert to a JSON object

    const author = fileAsJSONArray.find( //Iterates through each object In the array, 
                                        //finds the first object that contains the id we ae looking for and returns it to us
      (author) => author.id === req.params.id
    );

    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete blog
router.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath); //1.Read the file using fs.readFileSync

    const fileAsString = fileAsBuffer.toString(); //2. Convert the file to a string, "[]"

    let fileAsJSONArray = JSON.parse(fileAsString);//3. Convert to a JSON object

    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id //Returns the first object that matches the id we are looking for and stores in author
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(//
      (author) =>{
        console.log(author)
        return author.id !== req.params.id // returns All blogs but the one that has the same id we specified i the request
      }
    );
    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));// Overwriting the blogs array with a new array that doesnt contain the author we filtered out
    res.status(204).send();//Send updated array to the server
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update author
router.put("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath); // 1. Read the file

    const fileAsString = fileAsBuffer.toString(); // 2. Convert to string

    let fileAsJSONArray = JSON.parse(fileAsString); // 3. Convert to a JSON object

    const authorIndex = fileAsJSONArray.findIndex(
      (author) => author.id === req.params.id  // returns the author that contains an id that is equivalent to the id in our request
    );

    if (!authorIndex == -1) { // if authorIndex returns null,undefined == -1, execute the code block with an error
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!`});
    }

    const previousAuthorData = fileAsJSONArray[authorIndex]; //using previous author data, found using the index of the author id (authorIndex)
    const changedAuthor = {
      ...previousAuthorData,// expand previous data
      ...req.body,// new/incoming data
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[authorIndex] = changedAuthor;

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedAuthor);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default router;
