const Users = require ('../model/feedback')
const express = require('express')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const {getAllFeedbacks,createNewFeedback} = require("../crudfiles/feedback.crud");
const router = express.Router()

router.post('/feedbacks', async(req, res, next) => {
    try{
        const result = await createNewFeedback(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})



//get all feedbacks

router.get('/feedbacks',async(req,res,next) => {
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