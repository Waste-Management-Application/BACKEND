//const Users = require ('../model/feedback')
const express = require('express')

const AuthController = require('../controllers/AuthController')

//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const {getAllFeedbacks,createFeedback,createComplaint, getAllComplaint} = require("../crudfiles/feedback.crud");
const router = express.Router()

//send a Feedback
router.post('/',AuthController.protect, AuthController.restrictTo(['Customer']), async(req, res, next) => {
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

//send a complaint
router.post('/complaint',AuthController.protect, AuthController.restrictTo(['Customer']), async(req, res, next) => {
    try{
        const result = await createComplaint(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})



//get all complaint
router.get('/complaint',async(req,res,next) => {
    try {
        const result = await getAllComplaint(req);
        
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