const Customer = require ('../model/customer')

const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");

//create a new customer
exports.createCustomer = CatchAsync(async(req, res, next) =>{
    const newCustomer = await Customer.create(req.body);

    res.status(202).json({
        status:"success",
        data : {
            newCustomer
        }
    })
})

//get all customers from database
exports.getAllCustomers = CatchAsync(async(req, res, next) =>{
    const customers   = await Customer.find()
    
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
    const customer = await Customer.findOne({_id: id});

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
    const customer = await Customer.findOne({lastName: req.params.lastName})

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
    const user = await Customer.findOneAndUpdate({_id: id}, req.body, {
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
	const customer = await Customer.findOneAndDelete({_id: id})
	if(!customer){
		return next(new AppError('No customer with such an id', 401));
	}
	res.status(204).json({
		status: "Successfully deleted"
	})
	
	}
)





