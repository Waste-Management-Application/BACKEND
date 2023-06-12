const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    message:{
        type:String,
        required: true
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

const Feedback = mongoose.model("Feedback",feedbackSchema)
module.exports= Feedback;