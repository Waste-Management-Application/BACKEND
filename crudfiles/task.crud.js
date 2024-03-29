const Task = require ("../model/task")
//const uuid = require('uuid');

async function createNewTask(req){
    try{
        const newTask = await Task.create({
            taskType:req.body.taskType,
            taskCompleted:req.body.taskCompleted,
            
        });
        if(newTask === null){
            return{
                status:'failed',
                message:'unable to create Task'
            }
        }
        return {
            status: "success",
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
    const result = await Task.find().populate({path:'driver', select:['firstName','lastName']});

    return{
        status: "success",
        message: "successfully retrieved Task",
        results: result.length,
        data: result
    };
}    

//get task completed by iD
async function getTaskDetails(req){
    const id = req.params.id;
    
    try{
        const result = await Task.findOne({_id: id})
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
        message : "An error occured, please try again"}
    }
}

//Changing status of Task
async function changeTaskStatus(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findById({ _id: id });

    if (!task) {
      return res.status(404).json({
        status: 'failed',
        message: 'unable to change status'
      });
    }

    // Update the status of the task
    task.taskCompleted = "Completed";

    // Check if driverId is provided
    const driverId = req.body.driverId;
    if (driverId) {
      // If provided, update the driver field with the driver's ID
      task.driver = driverId;
    }

    // Save the updates
    await task.save();

    return {
      status: "success",
      message: "Task status successfully updated",
    }
    } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "An error occurred, please try again later",
    });
  }
} 

module.exports={
    getAllTasks,
    getTaskDetails,
    createNewTask,
    changeTaskStatus

}
