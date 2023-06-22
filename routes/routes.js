const customerController = require("../controllers/customerController")
const driverController = require("../controllers/driverController")
const AuthController = require('../controllers/AuthController')
//const Customers = require ('../model/customer')
//const Driver = require ('../model/driver')

const express = require('express')


const router = express.Router()
//Customer SignUp route
router.post("/customerSingUp", AuthController.customerSignUp)
router.post("/driverSingUp", AuthController.driverSignUp)
//Driver SignUp route
router.post("/customerSignIn", AuthController.customerSignIn)
router.post("/driverSignIn", AuthController.driverSignIn)
//ForgotPassword and ResetPassword 
router.post("/forgotPassword", AuthController.forgotPassword)
router.patch("/resetPassword/:token", AuthController.resetPassword)

router
      .route("/customers/")
      .get(customerController.getAllCustomers)
      .post(customerController.createCustomer)
      


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