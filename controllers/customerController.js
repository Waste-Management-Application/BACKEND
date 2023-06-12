const Customers = require ('../model/customer')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

//create a new customer
exports.createCustomer = CatchAsync(async(req, res, next) =>{
    const newCustomer = await Customers.create(req.body);

    res.status(202).json({
        status:"success",
        data : {
            newCustomer
        }
    })
})

//get all customers from database
exports.getAllCustomers = CatchAsync(async(req, res, next) =>{
    const customers   = await Customers.find()
    
    res.status(200).json({
        status: "success",
        results: customers.length,
        data: {
            customers
        }
      })
})

//find a specific customer
exports.getCustomerById = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const customer = await Customers.findOne({_id: id});

    if(!customer){
        return next(new AppError('No customer with such an id', 401));
    }

    res.status(200).json({
        status : "success",
        data:{
            customer
        }
    })
})




//TODO:::Search Customers
exports.getCustomer = CatchAsync(async(req, res, next) =>{
    const customer = await Customers.findOne({lastName: req.params.lastName})

    if(!customer){
        return next(new AppError('No customer with such an id', 401));
    }

    res.status(200).json({
        status : "success",
        data:{
            customer
        }
    })
})

//update a customer details
exports.updateCustomer = CatchAsync(async(req, res, next) =>{
    const id = req.params.id;
    const user = await Customers.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!user){
        return next(new AppError('No customer with such an id', 401))
    }

    res.status(200).json({
        status : "success",
        data:{
            user
        }
    })

})

//delete customer account
exports.deleteCustomerAccount = CatchAsync(async(req, res, next) => {
	const id = req.params.id;
	const customer = await Customers.findOneAndDelete({_id: id})
	if(!customer){
		return next(new AppError('No customer with such an id', 401));
	}
	res.status(204).json({
		status: "Successfully deleted"
	})
	
	}
)





