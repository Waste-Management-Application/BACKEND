const Users = require ('../model/task')
const express= require('express')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const {getAllTasks,getTaskDetails,createNewTask} = require("../crudfiles/task.crud");
const router = express.Router()


router.post('/task', async(req, res, next) => {
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


router.get('/task',async(req,res,next) => {
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


router.get("/task/:TaskID",async(req,res,next) =>{
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