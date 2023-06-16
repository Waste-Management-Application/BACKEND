const Users = require ('../model/feedback')
const express = require('express')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const {getAllFeedbacks,createFeedback} = require("../crudfiles/feedback.crud");
const router = express.Router()

router.post('/', async(req, res, next) => {
    try{
        const result = await createFeedback(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})



//get all feedbacks

router.get('/',async(req,res,next) => {
    try {
        const result = await getAllFeedbacks(req);
        
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})

module.exports = router;