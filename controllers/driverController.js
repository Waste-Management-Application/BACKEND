const Driver = require ('../model/driver')
const sendEmail = require("../utils/email");
const bcrypt = require('bcryptjs');

const randomstring = require('randomstring');

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

//create a new Driver
exports.createDriver = CatchAsync(async(req, res, next) =>{
     // Generate a random password for driver which is of 8 characters
     const password = randomstring.generate(8);
     //hash the generated password
     const hashedPassword =    await (bcrypt.hash(password, 10));
 
     const newUser = await Driver.create({
         firstName:req.body.firstName, 
         lastName:req.body.lastName,
         email:req.body.email,
         location:req.body.location, 
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
 
    res.status(202).json({
        status:"success",
        message:"Check your email for  Login Password",
        data : {
            newUser
        }
    })
})

//get all Drivers from database
exports.getAllDrivers = CatchAsync(async(req, res, next) =>{
    const drivers   = await Driver.find()
    
    res.status(200).json({
        status: "success",
        results: drivers.length,
        data: {
            drivers
        }
      })
})

//TODO::find a specific Driver

exports.getDriver = CatchAsync(async(req, res, next) =>{
    const driver = await Driver.findOne({lastName: req.params.lastName})

    if(!driver){
        return next(new AppError('Last name matches no driver', 401));
    }

    res.status(200).json({
        status : "success",
        data:{
            driver
        }
    })
})

//find a specific driver
exports.getDriverByID = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const driver = await Driver.findOne({_id: id})

    if(!driver){
        return next(new AppError('ID matches no driver', 401));
    }

    res.status(200).json({
        status : "success",
        data:{
            driver
        }
    })
})

//update a Driver details
exports.updateDriver = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const user = await Driver.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!user){
        return next(new AppError('ID matches no driver', 401))
    }

    res.status(200).json({
        status : "success",
        data:{
            user
        }
    })

})

//delete Driver account
exports.deleteDriverAccount = CatchAsync (async(req, res, next) => {
	const id = req.params.id;
	const driver = await Driver.findOneAndDelete({_id: id})
	if(!driver){
		return next(new AppError('ID matches no driver', 401));
	}
	res.status(204).json({
		status: "Successfully deleted"
	})
	
	}
)

//Update driver location continiously
exports.updateDriverLocation = CatchAsync(async(req, res, next) => {

    const longitude = Number(req.body.location.coordinates[0]);
    const latitude = Number(req.body.location.coordinates[1]);

    // Find the user by ID
    const user = await Driver.findById( id = req.body.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    // Update the location
    user.location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    };

    // Save the updated user
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Location updated successfully',
        data: user
    });
});






