const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
    
    
    message:{
    
        type:String,
        required: true,
        trim:true
    },

    starsNo:{
        type:Number,
        required:true,
        default : 4.5

    },

    

    DateSent: {
        type:Date,
        default:Date.now()
    }

})

const complaintSchema = new mongoose.Schema({
    
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
    
    
    message:{
    
        type:String,
        required: true,
        trim:true
    },

    
    DateSent: {
        type:Date,
        default:Date.now()
    }

})

const Feedback = mongoose.model("Feedback",feedbackSchema)
const Complaint = mongoose.model("Complaint",complaintSchema)
module.exports= {Feedback,Complaint}