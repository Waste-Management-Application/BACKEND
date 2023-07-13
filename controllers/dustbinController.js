//const Users = require ('../model/dustbin')
const express = require('express')
const AuthController = require('../controllers/AuthController')


//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const {getAllDustbins,createNewDustbin,createNewDustbinRequest,getAllDustbinRequest, getAllPickupRequest,createNewPickupRequest} = require("../crudfiles/dustbin.crud");
const router = express.Router()

// create new dustbin
router.post('/',AuthController.protect,AuthController.restrictTo(['Admin']), async(req, res, next) => {
    try{
        const result = await createNewDustbin(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})


//create a new dustbin request

router.post('/dustbinRequest',AuthController.protect, AuthController.restrictTo(['Customer']),async(req,res,next)=>{
    try{
        const result = await createNewDustbinRequest(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})
// get all dustbin request with customer details
router.get('/dustbinRequest',AuthController.protect,AuthController.restrictTo(['Admin']),async(req,res,next) => {
    try {
        const result = await getAllDustbinRequest(req);
        
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})

//new pickup request
router.post('/pickupRequest',AuthController.protect, AuthController.restrictTo(['Customer']),async(req,res,next)=>{
    try{
        const result = await createNewPickupRequest(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})
// get all pickup request with customer details
router.get('/pickupRequest',AuthController.protect,AuthController.restrictTo(['Admin']),async(req,res,next) => {
    try {
        const result = await getAllPickupRequest(req);
        
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})
       
  
    

//get all dustbins

router.get('/',AuthController.protect,AuthController.restrictTo(['Admin']),async(req,res,next) => {
    try {
        const result = await getAllDustbins(req);
        
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
    
