const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },

    vehicleNo:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    DateCreated: {
        type:Date,
        default: Date.now()
    }
})

const Vehicle = mongoose.model("Vehicle",vehicleSchema)
module.export= Vehicle;