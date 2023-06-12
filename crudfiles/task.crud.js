const task = require ("../model/customer")
//const uuid = require('uuid');

async function createNewTask(req){
    try{
        const newTask = await task.create({
            taskType:req.body.taskType,
            taskCompleted:req.body.taskCompleted
            
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
    const result = await task.find()

    return{
        status: "sucess",
        message: "successfully retrieved Task",
        results: result.length,
        data: result
    }
}    

//get task completed by iD
async function getTaskDetails(req){
    const id = req.params.id;
    
    try{
        const result = await task.findOne({_id: id})
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
