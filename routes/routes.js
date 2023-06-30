const customerController = require("../controllers/customerController")
const driverController = require("../controllers/driverController")
const AuthController = require('../controllers/AuthController')
//const Customers = require ('../model/customer')
//const Driver = require ('../model/driver')

const express = require('express')


const router = express.Router()
//Customer SignUp and SignIn route
router.post("/customerSignUp", AuthController.customerSignUp)
router.post("/customerSignIn", AuthController.customerSignIn)
//Driver SignUp and SignIn route
router.post("/driverSignUp", AuthController.driverSignUp)
router.post("/driverSignIn", AuthController.driverSignIn)
//ForgotPassword and ResetPassword 
router.post("/forgotPassword", AuthController.forgotPassword)
router.patch("/resetPassword/:token", AuthController.resetPassword)

router
      .route("/customers/")
      .get(customerController.getAllCustomers)
      .post(customerController.createCustomer)

// router.route("/UpdateCustomerLocation/:id")
//       .patch(AuthController.protect, customerController.updateCustomerLocation)        
      


// router
//     .route("/customers/:lastName")
//     .get(customerController.getCustomer)
//     .patch(customerController.updateCustomer)

router.route("/customers/:id")
    .get(customerController.getCustomerById)
    .patch(customerController.updateCustomer)
    .delete(customerController.deleteCustomerAccount)
    .delete(AuthController.deactivateCustomerAcc)
    
    
router
    .route("/drivers/")    
    .get(driverController.getAllDrivers)
    .post(driverController.createDriver)

router.route("/UpdateDriverLocation")
      .post(AuthController.protect,driverController.updateDriverLocation)    



// router
//     .route("/drivers/:lastName")
//     .get(driverController.getDriver)    
//     .patch(driverController.updateDriver)

router.route("/drivers/:id")
    .get(driverController.getDriverByID)
    .patch(driverController.updateDriver)
    .delete(driverController.deleteDriverAccount)
    .delete(AuthController.deactivateDriverAcc)
    



    //end points
router.use("/dustbin", require('../controllers/dustbinController'))    
router.use("/vehicle", require('../controllers/vehicleController'))    
router.use("/task", require('../controllers/taskController'))    
router.use("/feedback", require('../controllers/feedbackController'))    



module.exports = router;