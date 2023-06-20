//const Users = require ('../model/dustbin')
const express = require('express')
const AuthController = require('../controllers/AuthController')


//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const {getAllDustbins,createNewDustbin,createNewDustbinRequest,getAllDustbinRequest} = require("../crudfiles/dustbin.crud");
const router = express.Router()

// create new dustbin
router.post('/',AuthController.protect, async(req, res, next) => {
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
router.get('/dustbinRequest',AuthController.protect,async(req,res,next) => {
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
       
  
    

//get all dustbins

router.get('/',AuthController.protect,async(req,res,next) => {
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

// // get dustbin details
// router.get("/dustbin/:DustbinID",async(req,res,next) =>{
//     try {
//             const result = await getDustbinDetails(req);
//             if(result.status === "success"){
//                 res.status(200).json(result)
//             }
//             res.status(400).json(result)
//         }catch(error){
//             next(error);
//         }
// });

// // //delete dustbin by ID  
// // router.delete("/dustbin/:DustbinID/deleteDustbin",async(rq,res,next)=>{
//     try{
//         const result = await deleteDustbinByID(req);
//     if(result.status === "success")
//     {
//         res.status(200).json(result)
//     }
//     res.status(400).json(result)
// }catch(error){
//     next(error);
// }

// })


module.exports = router;
    
