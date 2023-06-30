//const Users = require ('../model/task')
const express= require('express')

const AuthController = require('../controllers/AuthController')

//const CatchAsync = require("../utils/CatchAsync");
//const AppError = require("../utils/apperror");

const {getAllTasks,getTaskDetails,createNewTask} = require("../crudfiles/task.crud");
const router = express.Router()


router.post('/',AuthController.protect,AuthController.restrictTo(['Driver']), async(req, res, next) => {
    try{
        const result = await createNewTask(req);
        
        if(result.status === "success"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
    
})

//get all tasks completed
router.get('/',AuthController.protect,AuthController.restrictTo(['Admin']),async(req,res,next) => {
    try {
        const result = await getAllTasks(req);
        
        if (result.status==="success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    catch(error){
        next(error);
    }
})

//get task by id
router.get("/:id",AuthController.protect,async(req,res,next) =>{
    try {
        const id = req.params.id;
            const result = await getTaskDetails(req);
            if(result.status === "success"){
                res.status(200).json(result)
            }
            res.status(400).json(result)
        }catch(error){
            next(error);
        }
});

module.exports = router;