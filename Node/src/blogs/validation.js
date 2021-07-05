import {checkSchema, validationResult} from "express-validator";


const schema ={ //This is where we have set the requirements of our server
    title:{     // 
        in:['body'],
        isString:{
            errorMessage: "Title validation failed, type must be string",
        }
    },
    category:{
        in:['body'],
        isString:{
            errorMessage: "Category validation failed, type must be string",
        }
    },
    "author.name":{
        in:['body'],
        isString:{
            errorMessage: "author.name validation failed, type must be string"
        }
    },
    "author.avatar":{
        in:['body'],
        isString:{
            errorMessage: "avatar.avatar validation failed, type must be string"
        }
    },
    "readTime.unit":{
        in:['body'],
        isNumeric:{
            errorMessage: "readTime.unit validation failed, type must be numeric"
        }
     },
    cover:{
        in:['body'],
        isString:{
            errorMessage: "Content validation failed, type must be string"
        }
     }
}

export const checkBlogPostSchema = checkSchema(schema)

export const checkValidationResult = (req, res, next) =>{
    const errors = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Blog post validation has failed')
        error.status = 400;
        error.errors = errors.array()
        next(error)
    }
    next()
}


