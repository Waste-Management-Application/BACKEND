const Users = require ('../model/vehicle');
const express = require('express');

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const { getAllVehicles,deleteVehicleByID,createNewVehicle,getVehicleDetails} = require("../crudfiles/vehicle.crud");
const router = express.Router()

// create new vehicle
router.post('/vehicle', async(req, res, next) => {
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

router.get('/vehicle',async(req,res,next) => {
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

// get vehicle details
router.get("/vehicle/:VehicleID",async(req,res,next) =>{
    try {
            const result = await getVehicleDetails(req);
            if(result.status === "success"){
                res.status(200).json(result)
            }
            res.status(400).json(result)
        }catch(error){
            next(error);
        }
});

//delete vehicle by ID  
router.delete("/vehicle/:VehicleID/deleteVehicle",async(rq,res,next)=>{
    try{
        const result = await deleteVehicleByID(req);
    if(result.status === "success")
    {
        res.status(200).json(result)
    }
    res.status(400).json(result)
}catch(error){
    next(error);
}

})

module.exports = router;

    

