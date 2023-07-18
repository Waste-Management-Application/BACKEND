const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: false
    },

    // taskDescription:{
    //     type:String,
    //     required:true

    // },   

    taskCompleted:{
        type:Boolean,
        default:true

    },

    taskType:{
        type: String,
        enum : ['Empty Bin', 'Deliver Bin'],
        default: 'Empty Bin'

    },

    DateCompleted: {
        type:Date,
        default: Date.now()
    }


})

const Task = mongoose.model("Task",taskSchema)
module.exports= Task;