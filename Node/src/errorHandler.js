const catchAllErrorHandler =(err,req,res)=>{
    if(err){
        if(!req.headersSeat){
            res.status(err.status || 500).send({message:err.message || "Something went wrong"})
        }
    }
}