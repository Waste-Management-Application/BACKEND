//
const express = require('express')

const AuthController = require('../controllers/AuthController')

//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const {createComplaint,getAllComplaint} = require("../crudfiles/complaint.crud");
const router = express.Router()

//send a complaint
router.post('/',AuthController.protect, AuthController.restrictTo(['Customer']), async(req, res, next) => {
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

router.get('/',async(req,res,next) => {
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