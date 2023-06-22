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
    Location:{
        type:String,
        required:[false, 'Location is required']
    },

    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        validate : [validator.isEmail, 'FirstName is required']
    },
    contact:{
        type:String,
        require:[true, 'contact is required']
    },
    gender:{
        type:String,
        required:true
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
    }
    

})

const Driver = mongoose.model("Driver",DriverSchema)
module.exports= Driver;