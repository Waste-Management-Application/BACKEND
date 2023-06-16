const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const customerSchema = new mongoose.Schema({
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
        required:[true, 'Location is required']
    },

    contact:{
        type:String,
        require:[true, 'contact is required']
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

    },
    passwordChangedAt : Date,
	passwordResetToken : String,
	passwordResetExpires: Date,
    
    
    DateRegistered: {
        type:Date,
        default: Date.now()
    }
    
    


})

customerSchema.pre('save', async function(next){
	// checks if password is not modified
	if(!this.isModified('password')) return next();

	// encrypts password
	this.password = await bcrypt.hash(this.password, 12);

	// removes passwordConfirm field from the document
	this.confirmPassword = undefined
	next();
})

customerSchema.methods.correctPassword = async function(candidatePassword, userPassword){
	return await bcrypt.compare(candidatePassword, userPassword)
}

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;  

