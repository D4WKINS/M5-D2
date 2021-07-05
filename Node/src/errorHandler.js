export const notFound =(err,req,res,next)=>{
    if(err &&err.status === 400){
        res.status(400).send({ message:err.message || "Not found!", errors:err.errors })
    } next()//IF error and error.status is not === 400 Try the next middleware
}

export const forbidden =(err, req, res ,next)=>{
    if(err && err.status === 403){
        res.status(403).send({message:err.message || "Forbidden"})
    } next()
}

export const catchAllErrorHandler =(err,req,res,next) =>{
    if(err){
        if(!req.headersSeat){
            res
            .status(err.status || 500)
            .send({message:err.message || "Something went wrong"})
        }} next()
}