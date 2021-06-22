import express from "express"

const router = express.Router()

//get all authors
router.get("/", async(req, res, next) => {
    try{
        
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


//get single authors
router.get("/:id", async(req, res, next) => {
    try{
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


// create author
router.post("/:id", async(req, res, next) => {
    try{
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


// delete author
router.delete("/:id", async(req, res, next) => {
    try{
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})


// update author
router.put("/:id", async(req, res, next) => {
    try{
    }
    catch(error){
        res.send(500).send({message:error.message});
    }
})
export default router

