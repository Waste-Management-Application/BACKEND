const mongoose = require('mongoose')
const validator = require('validator')

const AdminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'FirstName is required']
    },
    lastName:{
        type:String,
        required:[true, 'LastName is required']
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
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlenght: 8,
        select: false
    },
    confirmPassword:{
        type:String,
        required:[true, 'Confirm password'],
        validator: {
            validator : function(el){
                return el === this.password;
            },
            message: 'password mismatch'
        }

    }

})

const admin = mongoose.model("Admin",AdminSchema)
module.export= admin;