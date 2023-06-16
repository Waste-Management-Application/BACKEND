const Task = require ("../model/task")
//const uuid = require('uuid');

async function createNewTask(req){
    try{
        const newTask = await Task.create({
            taskType:req.body.taskType,
            taskCompleted:req.body.taskCompleted,
            driver:req.body.driver
            
        });
        if(newTask === null){
            return{
                status:'failed',
                message:'unable to create Task'
            }
        }
        return {
            status: "success!",
            message: "task successfully created",
            data : newTask
        };
        }
        catch(err){
            console.log(err)
            return{
                status: "error",
                message: "An error occured, please try again later",
            };
        }

}


//get all task completed 
async function getAllTasks(){
    const result = await Task.find().populate({path:'driver',select:['firstName', 'lastName']})

    return{
        status: "success",
        message: "successfully retrieved Task",
        results: result.length,
        data: result
    }
}    

//get task completed by iD
async function getTaskDetails(req){
    const id = req.params.id;
    
    try{
        const result = await Task.findOne({_id: id}).populate({path:'driver',select:['firstName', 'lastName']})
        if(result===null){
            return{
                status:"failed" , 
                message: "Task not found"
            }
        }
        return {
            status : "success",
            message: "Task found",
            data : result
        }
    }
    catch(error){
        return {status : "error" , 
        message : "an error occured, please try again"}
    }
}

module.exports={
    getAllTasks,
    getTaskDetails,
    createNewTask

}
