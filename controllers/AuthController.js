const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const randomstring = require('randomstring');

const Customer = require('../model/customer')
const Driver = require('../model/driver')
const Admin = require('../model/admin')

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const {promisify} = require('util');
const sendEmail = require("../utils/email");
const sendSMS = require("../utils/SMS");
const bcrypt = require('bcryptjs');

const frontendPort = process.env.FRONTEND_PORT || 3000;
const frontendPort2 = 3001

const revokedTokens = new Set();

const SignToken = (id) => { 
    return jwt.sign({id}, 
        process.env.JWT_SECRET, 
        {expiresIn : process.env.JWT_EXPIRY})
}

const SendToken = (newUser, res, statusCode,message) => {
   const token = SignToken(newUser._id)

   res.status(statusCode).json({
       status: 'success',
       token,
       message,
       data : {
           newUser
       }
   })

}

//Admin signUp controller
exports.adminSignUp = CatchAsync(async(req,res,next)=> {

    const adminExists = await Admin.checkAdminExists();
    if (adminExists) {
        return next(new AppError('Admin account already exists', 400 ))
    }
    
    const newUser = await Admin.create({
        firstName:req.body.firstName, 
        lastName:req.body.lastName,
        email:req.body.email,
        gender:req.body.gender, 
        contact:req.body.contact, 
        location:"Kumasi,Ghana",
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        role:"Admin",

    })

    res.status(200).json({
        status : "SignUp Successful",
        data:{
            newUser
        }
    })
    

})
  

//cutomer signUp controller
exports.customerSignUp = CatchAsync(async(req,res,next)=> {
    
    const newUser = await Customer.create({
        firstName:req.body.firstName, 
        lastName:req.body.lastName,
        email:req.body.email, 
        contact:req.body.contact, 
        location:req.body.location,
        gender:req.body.gender,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        role:"Customer",

    })
     // Sending a welcome email to the customer
     try {
        await sendEmail({
            email: newUser.email,
            subject: 'Welcome to Our Community!',
            message: `Dear ${newUser.firstName},\n\nThank you for joining our community! We are excited to have you on board and hope you enjoy our services.\n\nPlease remember make a payment of GH₵25 to Binbuddy in the app to activate our services .\n\nBest regards,\nThe Binbuddy Team`,
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }

     // Sending an SMS to the customer
  try {
     await sendSMS(newUser.contact, `Dear ${newUser.firstName},\n\nWelcome to Our Community! We are excited to have you on board.\n\nPlease remember to Make a payment of GH₵25 to Binbuddy in the app to activate our services .\n\nBest regards,\nThe Binbuddy Team`);
    } catch (error) {
    console.error('Error sending SMS:', error);
  }

    res.status(200).json({
        status: "SignUp Successful",
        data: {
            newUser,
        },
    });
});

//Driver signUp controller
exports.driverSignUp = CatchAsync(async(req,res,next)=> {
    // Generate a random password for driver which is of 8 characters
    const password = randomstring.generate(8);
    //hash the generated password
    const hashedPassword =    await (bcrypt.hash(password, 10));

    const newUser = await Driver.create({
        firstName:req.body.firstName, 
        lastName:req.body.lastName,
        email:req.body.email,
        gender:req.body.gender,
        contact:req.body.contact, 
        role:"Driver",
        hashedPassword: hashedPassword
    })

    const message = `Welcome to our Company ${newUser.firstName} ${newUser.lastName}.\nBelow is your credentials to login.\n\nEmail: ${newUser.email}. \nPassword: ${password}\n\n`

    await sendEmail({
        email:newUser.email,
        subject: 'Driver Account Created',
        message 

    })

    res.status(202).json({
        status:"success",
        message:"Contact Admin for your Login Password",
        data : {
            newUser
        }
    })

})


// Admin login controller
exports.adminSignIn = CatchAsync(async (req, res, next) =>{
    const {email, password} = req.body
    // check if email and password exist
    if(!email || !password){
        return next(new AppError('Provide email and password', 400 ))
    }
    // checks if user exists and password is correct
    const newUser = await Admin.findOne({email}).select('+password');

    if(!newUser || !(await newUser.correctPassword(password, newUser.password))){
        return next(new AppError('Incorrect email or password',401))
    }

    // if(!newUser.isActive){
    //     return next(new AppError('Account is not active', 400))
    // }

    SendToken(newUser, res, 200, 'Admin login successful')

})



// customer login controller
exports.customerSignIn = CatchAsync(async (req, res, next) =>{
        const {email, password} = req.body
        // check if email and password exist
        if(!email || !password){
            return next(new AppError('Provide email and password', 400 ))
        }
        // checks if user exists and password is correct
        const newUser = await Customer.findOne({email}).select('+password');

        if(!newUser || !(await newUser.correctPassword(password, newUser.password))){
            return next(new AppError('Incorrect email or password',401))
        }

        // if(!newUser.isActive){
        //     return next(new AppError('Account is not active', 400))
        // }

        SendToken(newUser, res, 200, 'Customer login successful')

    })

    // Driver login controller
    exports.driverSignIn = CatchAsync(async (req, res, next) => {
        const { email, password } = req.body;
      
        // Find the driver by email
        const newUser = await Driver.findOne({ email }).select('+password');
      
        // Check if the driver exists
        if (!newUser) {
          return next(new AppError('Invalid email or password', 401));
        }
      
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid =  await bcrypt.compare(password, newUser.hashedPassword);

      
        // Check if the password is valid
        if (!isPasswordValid) {
          return next(new AppError('Invalid email or password', 401));
        }
      
        // Generate and send the authentication token
        SendToken(newUser, res, 200, 'Driver login successful')

      });
      
    // Protecting Routes
    exports.protect = CatchAsync(async(req,res,next)=>{
    
          //getting token and check if its there
          let token;
          if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
              token = req.headers.authorization.split(' ')[1]
          }
  
          if(!token){
              return next(new AppError('You are not logged in.Please Log in to get access', 401))
          }


          // Check if the token exists in the revoked tokens list
          if (revokedTokens.has(token)) {
            return next(new AppError('Invalid token', 401));
          }
        

       // verifying token
       const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

       //Check if users still exist
       let currentUser = await Customer.findById(decoded.id);
        //Store the user id in req.body
        req.body.customer = decoded.id;
      
       if (!currentUser) {
          currentUser = await Driver.findById(decoded.id);
          req.body.driver = decoded.id;
           if (!currentUser){
            currentUser = await Admin.findById(decoded.id);
            req.body.admin= decoded.id;
            if(!currentUser){
                return next(new AppError('User with this token does no longer exist', 401));    
            }
           }
        }
      
         //check if user changed password after token was issued
          if(currentUser.role === 'Customer' || currentUser.role === 'Admin'){
              if(currentUser.passwordChangedAfter(decoded.iat)){
                  return next( new AppError('User recently changed Password. Please log in again', 400))
              }
          }
        
      //GRANT ACCESS TO PROTECTED ROUTE
          req.newUser = currentUser;
          //console.log("This route is protected");
          //console.log(decoded);

      res.currentUser =currentUser;
      next();

    })

    // Restrict routes to certain users
    exports.restrictTo = (roles) =>{
        return (req, res, next) => {
           const currentUser = res.currentUser;
            //console.log(roles);
            if(!(roles.includes(currentUser.role))){
                return next(
                    new AppError('You do not have permission to perform this action', 403)
                )
            }
            next();
        }
    }

    //forgot password controller for Customer
    exports.forgotPassword = CatchAsync(async(req,res,next) =>{
        //get user based on posted email
        const user = await Customer.findOne({email:req.body.email})
        if(!user){
            return next(new AppError('There is no user with email this address',404))
        }
        //generate the random rese token
        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave : false});
        //send it to user email
        const resetURL =`${req.protocol}://${req.hostname}:${frontendPort2}/ResetPassword/${resetToken}`;
        try{
            await sendEmail({
                email: user.email,
                subject : 'Your password reset token (valid for 10min)',
                message : `Forgot your password?\nSubmit a patch with your new password and confirmPassword to:\n ${resetURL}\n\n If you didnt forget password please ignore this email.`
            })
            res.status(200).json({
                status: 'success',
                message : 'Token sent to email',
                data : {
                    user
                }
            })
        }catch(err){
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save({validateBeforeSave : false});
            next( new AppError('There was an error sending email. Try again later!', 500))
        }
    })


    //forgot password controller for admin
    exports.forgotAdminPassword = CatchAsync(async(req,res,next) =>{
        //get user based on posted email
        const user = await Admin.findOne({email:req.body.email})
        if(!user){
            return next(new AppError('There is no user with email this address',404))
        }
        //generate the random rese token
        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave : false});
        //send it to user email
        const resetURL = `${req.protocol}://${req.hostname}:${frontendPort}/ResetPassword/${resetToken}`;
        try{
            await sendEmail({
                email: user.email,
                subject : 'Your password reset token (valid for 10min)',
                message : `Forgot your password?\nSubmit a patch with your new password and confirmPassword to:\n ${resetURL}\n\n If you didnt forget password please ignore this email.`
            })
            res.status(200).json({
                status: 'success',
                message : 'Token sent to email',
                data : {
                    user
                }
            })
        }catch(err){
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save({validateBeforeSave : false});
            next( new AppError('There was an error sending email. Try again later!', 500))
        }
    })

    //Reset password controller for Customer
    exports.resetPassword = CatchAsync(async(req,res,next) =>{
        //Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await Customer.findOne({
                        passwordResetToken : hashedToken, 
                        passwordResetExpires : {$gt : Date.now()} 
                    })

    // checks if user exist and token not expired
    if(!user){
    return next(new AppError('Token is invalid or has expired', 400))
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //update changedPasswordAT property for the user

    //log the user in, send JWT
    SendToken(user, res, 200)
});

 //Reset password controller for admin
 exports.resetAdminPassword = CatchAsync(async(req,res,next) =>{
    //Get user based on the token
const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

const user = await Admin.findOne({
                    passwordResetToken : hashedToken, 
                    passwordResetExpires : {$gt : Date.now()} 
                })

// checks if user exist and token not expired
if(!user){
return next(new AppError('Token is invalid or has expired', 400))
}

user.password = req.body.password;
user.confirmPassword = req.body.confirmPassword;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save();

//update changedPasswordAT property for the user

//log the user in, send JWT
SendToken(user, res, 200)
});


// delete Customer Account 
exports.deactivateCustomerAcc = CatchAsync( async (req, res, next)=>{
    const user = await Customer.findOneAndUpdate(req.user.id, {isActive : false}, {
        new: true,
        runValidators: true
    })

    SendToken(user, res, 204);
})
// delete Driver Account 
exports.deactivateDriverAcc = CatchAsync( async (req, res, next)=>{
    const user = await Driver.findOneAndUpdate(req.user.id, {isActive : false}, {
        new: true,
        runValidators: true
    })

    SendToken(user, res, 204);
})

// Update admin profile
exports.updateAdminAcc = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const user = await Admin.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!user){
        return next(new AppError('No Admin with such an id', 401))
    }
        

    res.status(200).json({
        status : "Successfully Updated",
        data:{
            user
        }
    })

})
//get admin account
exports.getAdminById = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const admin = await Admin.findOne({_id: id});

    if(!admin){
        return next(new AppError('No Admin with such an id', 401));
    }

    res.status(200).json({
        status : "success",
        data:{
            admin
        }
    })
})

//delete admin profile
exports.deleteAdminAccount = CatchAsync(async(req, res, next) => {
	const id = req.params.id;
	const admin = await Admin.findOneAndDelete({_id: id})
	if(!admin){
		return next(new AppError('No Admin with such an id', 401));
	}
	res.status(200).json({
		status: "Successfully deleted"
	})
	
	}
)

// 
exports.logout = CatchAsync(async(req,res,next)=>{
  // Retrieve the token from the request headers
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
  }

  // Add the token to the revoked tokens list
  revokedTokens.add(token);

  // Respond with a success message
  res.status(200).json({ message: 'Logout successful' });
   
});

exports.sendAnnouncement = CatchAsync(async (req, res, next) => {
    const { message, targetAudience } = req.body; // Assuming the message and targetAudience are provided in the request body
  
    if (!message || !targetAudience) {
      return res.status(400).json({ error: 'Message and targetAudience are required' });
    }
  
    try {
      let recipients;
  
      if (targetAudience === 'customers') {
        recipients = await Customer.find().select('contact');
      } else if (targetAudience === 'drivers') {
        recipients = await Driver.find().select('contact');
      } else {
        return res.status(400).json({ error: 'Invalid targetAudience provided' });
      }
  
      if (recipients.length === 0) {
        return res.status(404).json({ error: 'No recipients found for the selected audience' });
      }
  
      // Send the SMS to each recipient's contact
      for (const recipient of recipients) {
        const contact = recipient.contact;
        if (!contact) {
          console.error(`Invalid contact data for recipient ${recipient._id}`);
          continue; // Move to the next recipient
        }
  
        try {
          await sendSMS(contact, message); // Send the message to the contact
          console.log(`SMS sent to recipient contact: ${contact}`);
        } catch (error) {
          console.error(`SMS sending error to recipient contact ${contact}:`, error);
        }
      }
  
      res.status(200).json({ message: 'Announcement sent successfully to selected audience' });
    } catch (error) {
      console.error('Error sending announcement:', error);
      res.status(500).json({ error: 'Error sending the announcement: ' + error.message });
    }
  });
  
