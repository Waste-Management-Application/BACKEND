const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
//const {promisify} = require('util');
const sendEmail = require("../utils/email");

const SignToken = (id) => { 
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY})
}

const SendToken = (user, res, statusCode) => {
    const token = SignToken(user._id)

    res.status(statusCode).json({
        status: 'success',
        token,
        data : {
            user
        }
    })

}




