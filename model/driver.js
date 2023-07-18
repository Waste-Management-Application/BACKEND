const mongoose = require('mongoose')
const validator = require('validator')
// const bcrypt = require('bcryptjs')

const DriverSchema = new mongoose.Schema({
    role:{
        type:String,
        default:'Driver'
    },
    
    firstName:{
        type:String,
        required:[true, 'FirstName is required'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'LastName is required'],
        trim:true
    },
    location: {
        type: {
          type: String,
          enum: ['Point'], // Only allow 'Point' as the type
          required: false
        },
        coordinates: {
          type: [Number], // Array of two numbers: [longitude, latitude]
          required: false,
        },
        digitalAddress: String
      },

    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        validate : [validator.isEmail, 'Email is required']
    },
    contact:{
        type:String,
        require:[true, 'contact is required']
    },

    hashedPassword : {
        type: String,
        required:true,
    },


    DateRegistered: {
        type:Date,
        default: Date.now()
    },

    isActive:{
        type: Boolean,
        default: true,
        select: false
    },

    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: false
    },
    

})

DriverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model("Driver",DriverSchema)
module.exports= Driver;