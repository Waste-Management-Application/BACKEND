const Driver = require ('../model/driver')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror")

//create a new Driver
exports.createDriver = CatchAsync(async(req, res, next) =>{
    const newDriver = await Driver.create(req.body);

    res.status(202).json({
        status:"success",
        data : {
            newDriver
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

    res.statu(200).json({
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

    res.statu(200).json({
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



