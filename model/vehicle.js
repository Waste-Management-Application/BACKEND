const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);


const vehicleSchema = new mongoose.Schema({
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },

    vehicleNo:{
        type:String,
        required:false,
        unique: true
    },

    // location:{
    //     type:String,
    //     required:true
    // },

    DateCreated: {
        type:Date,
        default: Date.now()
    }
})

vehicleSchema.plugin(autoIncrement.plugin,{
    model: 'Vehicle',
    field: 'vehicleNo',
    startAt: 1,
    incrementBy: 1, 
  })

const Vehicle = mongoose.model("Vehicle",vehicleSchema)
module.exports= Vehicle;