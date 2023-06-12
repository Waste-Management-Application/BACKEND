const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    // taskID:{
    //     type:String,
    //     required:true
    // },

    // taskDescription:{
    //     type:String,
    //     required:true

    // },   

    taskCompleted:{
        type:Boolean,
        default:false

    },

    taskType:{
        type: String,
        enum : ['Empty Bin', 'Collect Bin', 'Deliver Bin'],
        default: 'Empty Bin'

    },

    DateCompleted: {
        type:Date,
        default: Date.now()
    }


})

const Task = mongoose.model("Task",taskSchema)
module.export= Task;