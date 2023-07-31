const Customer = require ('../model/customer')
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/apperror");
const sendEmail = require("../utils/email");
const sendSMS = require("../utils/SMS");

exports.createCustomer = CatchAsync(async(req, res, next) =>{
    const newCustomer = await Customer.create(req.body);

     // Sending a welcome email to the customer
     try {
        await sendEmail({
            email: newCustomer.email,
            subject: 'Welcome to Our Community!',
            message: `Dear ${newCustomer.firstName},\n\nThank you for joining our community! We are excited to have you on board and hope you enjoy our services.\n\nPlease remember to Make a payment of GH₵25to Binbuddy in the app to activate our services .\n\nBest regards,\nThe Binbuddy Team`,
        });
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
   // Sending an SMS to the customer
   try {
    await sendSMS(newCustomer.contact, `Dear ${newCustomer.firstName},\n\nWelcome to Our Community! We are excited to have you on board. \n\nPlease remember to Make a payment of GH₵25 to Binbuddy in the app to activate our services .\n\nBest regards,\nThe Binbuddy Team`);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }

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
	res.status(200).json({
		status: "Successfully deleted"
	})
	
	}
)



// //Update Customer location 
// exports.updateCustomerLocation = CatchAsync(async(req, res, next) => {
   
//     const id = req.params.id;

//     const longitude = req.body.location.coordinates[0];
//     const latitude = req.body.location.coordinates[1];
//     // const confirmPassword = req.body.confirmPassword;
//     // const password = req.body.password;
    

//     // Find the user by ID
//     const user = await Customer.findById({_id : id}) //
//     //     new: true,
//     //     runValidators: true
//     // }  );

//     if (!user) {
//         return next(new AppError('User not found', 404));
//     }

//     //Update the location
//     user.location = {
//         type: 'Point',
//         coordinates: [longitude, latitude],
//     };

//     //  user.confirmPassword = confirmPassword;
//     //  user.password = password;
        
    

//     // Save the updated user
//     await user.save();

//     res.status(200).json({
//         status: 'success',
//         message: 'Location updated successfully',
//         data: user
//     });
// });







