const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const AdminSchema = new mongoose.Schema({
    role:{
        type:String,
        default:'Admin'
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

    contact:{
        type:String,
        required:[true, 'contact is required']
    },
   
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        validate : [validator.isEmail, 'FirstName is required']
    },
    location:{
        type:String,
        default:"Kumasi,Ghana"
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

    isActive:{
        type: Boolean,
        default: true,
        select: false
    },

    DateRegistered: {
        type:Date,
        default: Date.now()
    }



})

// Check if admin account already exists
AdminSchema.statics.checkAdminExists = async function () {
    const adminCount = await this.countDocuments({});
    return adminCount > 0;
  };

AdminSchema.pre('save', async function(next){
	// checks if password is not modified
	if(!this.isModified('password')) return next();

	// encrypts password
	this.password = await bcrypt.hash(this.password, 12);

	// removes passwordConfirm field from the document
	this.confirmPassword = undefined
	next();
})

AdminSchema.pre('save', function(next){
	if(!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
})

AdminSchema.methods.correctPassword = async function(candidatePassword, userPassword){
	return await bcrypt.compare(candidatePassword, userPassword)
}

AdminSchema.methods.passwordChangedAfter = function(JWTTimeStamp){
	if(this.passwordChangedAt){
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);

		//console.log(changedTimeStamp, JWTTimeStamp);
		// returns true if password has been changed
		return JWTTimeStamp < changedTimeStamp
	}

	// password not changed	
	return false
}

AdminSchema.methods.createPasswordResetToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	console.log({resetToken}, this.passwordResetToken)

	return resetToken;
}

const Admin = mongoose.model("Admin",AdminSchema)
module.exports= Admin;