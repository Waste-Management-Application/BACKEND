const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const customerSchema = new mongoose.Schema({
    role:{
        type:String,
        default:'Customer'
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

customerSchema.methods.passwordChangedAfter = function(JWTTimeStamp){
	if(this.passwordChangedAt){
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);

		//console.log(changedTimeStamp, JWTTimeStamp);
		// returns true if password has been changed
		return JWTTimeStamp < changedTimeStamp
	}

	// password not changed	
	return false
}

customerSchema.methods.createPasswordResetToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto
								.createHash('sha256')
								.update(resetToken)
								.digest('hex')

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	//console.log({resetToken}, this.passwordResetToken)

	return resetToken;
}


const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;  

