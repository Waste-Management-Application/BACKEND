//const Users = require ('../model/vehicle');
const express = require('express');
const AuthController = require('../controllers/AuthController')

//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const { getAllVehicles,createNewVehicle, updateVehicle} = require("../crudfiles/vehicle.crud");
const router = express.Router()

// create new vehicle
router.post('/',AuthController.protect,AuthController.restrictTo(['Admin']), async(req, res, next) => {
    try{
        const result = await createNewVehicle(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})

//get all vehicles

router.get('/',AuthController.protect,AuthController.restrictTo(['Admin']), async(req,res,next) => {
    try {
        const result = await getAllVehicles(req);
        
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})

// router.patch('/:id',AuthController.protect, async(req,res,next)=>{
//     try{
//         const result = await updateVehicle(req);
//         if (result.status==="success"){
//             return res.status(200).json(result);
//         }
//         return res.status(400).json(result);
//     }
//     catch(error){
//         next(error);
//     }



module.exports = router;

    

