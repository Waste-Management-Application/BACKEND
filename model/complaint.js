const mongoose = require('mongoose')

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

const Complaint = mongoose.model("Complaint",complaintSchema)
module.exports= Complaint;