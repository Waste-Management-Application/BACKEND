const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const randomstring = require('randomstring');

const Customer = require('../model/customer')
const Driver = require('../model/driver')

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const {promisify} = require('util');
const sendEmail = require("../utils/email");
const bcrypt = require('bcryptjs');



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
  

//cutomer signUp controller
exports.customerSignUp = CatchAsync(async(req,res,next)=> {
    
    const newUser = await Customer.create({
        firstName:req.body.firstName, 
        lastName:req.body.lastName,
        email:req.body.email, 
        contact:req.body.contact, 
        Location:req.body.Location,
        gender:req.body.gender,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        role:"Customer",

    })

    SendToken(newUser,res,201)
    

})

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
        contact:req.body.contact, 
        gender:req.body.gender,
        role:"Driver",
        hashedPassword: hashedPassword
    })

    const message = `A new driver account has been created by ${newUser.firstName} ${newUser.lastName}.\n\nEmail: ${newUser.email}. \nPassword: ${password}`

    await sendEmail({
        email:newUser.email,
        subject: 'Driver Account Created',
        message 

    })

    SendToken(newUser,res,201,'See Admin for your Login password')
        

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

        SendToken(newUser, res, 201, 'Customer login successful')

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
        SendToken(newUser, res, 201, 'Driver login successful')

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

       // verifying token
       const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

       //Check if users still exist
       let currentUser = await Customer.findById(decoded.id);
      
       if (!currentUser) {
          currentUser = await Driver.findById(decoded.id);
           if (!currentUser){
               return next(new AppError('User with this token does no longer exist', 401));    
           }
        }
      
         //check if user changed password after token was issued
          if(currentUser.role === 'Customer'){
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
            currentUser = res.currentUser;
            console.log(roles);
            if(!(roles.includes(currentUser.role))){
                return next(
                    new AppError('You do not have permission to perform this action', 403)
                )
            }
            next();
        }
    }



