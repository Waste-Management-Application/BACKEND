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
        type:String,
        default:"Not completed"

    },

    taskType:{
        type: String,
        enum : ['Empty Bins', 'Deliver Bin', 'Special Pickup'],
        default: 'Empty Bins'

    },

    DateCompleted: {
        type:Date,
        default: Date.now()
    }


})

const Task = mongoose.model("Task",taskSchema)
module.exports= Task;