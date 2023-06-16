const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const Customer = require('../model/customer')
const Driver = require('../model/driver')

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
//const {promisify} = require('util');
const sendEmail = require("../utils/email");

const SignToken = (id) => { 
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY})
}

const SendToken = (newUser, res, statusCode) => {
    const token = SignToken(newUser._id)

    res.status(statusCode).json({
        status: 'success',
        token,
        data : {
            newUser
        }
    })

}

//cutomer signUp controller
exports.customerSignUp = CatchAsync(async(req,res,next)=> {
    const newUser = await Customer.create(req.body)

    SendToken(newUser,res,201)
    

})

//Driver signUp controller
exports.driverSignUp = CatchAsync(async(req,res,next)=> {
    const newUser = await Driver.create(req.body)

    SendToken(newUser,res,201)
    

})


// customer login controller
exports.customerSignIn = CatchAsync(async (req, res, next) =>{
        const {email, password} = req.body
        // check if email and password exst
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

        SendToken(newUser, res, 201)

    })

    exports.protect = CatchAsync(async(req,res,next)=>{
        //getting token and check if its there
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        
        if(!token){
            return next(new AppError('You are not logged in.Please Log in to get access', 401))
        }

        //
    })



