const customerController = require("../controllers/customerController")
const driverController = require("../controllers/driverController")
const AuthController = require('../controllers/AuthController')
const paymentController = require("../controllers/paymentController");
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
//Payment routes
router.post("/payment/initiate", AuthController.protect,paymentController.initiatePayment);
router.get("/payment/verify/:reference", AuthController.protect,paymentController.verifyPayment);
router.get("/payment/verify", AuthController.protect,paymentController.handlePaymentSuccess);

router.post("/SendMessage",AuthController.sendAnnouncement)

router
      .route("/customers/")
      .get(AuthController.protect,AuthController.restrictTo(['Admin']),customerController.getAllCustomers)
      .post(AuthController.protect,AuthController.restrictTo(['Admin']),customerController.createCustomer)

// router.route("/UpdateCustomerLocation/:id")
//       .patch(AuthController.protect, customerController.updateCustomerLocation)        
      
router.route("/logout").post(AuthController.protect,AuthController.logout)

// router
//     .route("/customers/:lastName")
//     .get(customerController.getCustomer)
//     .patch(customerController.updateCustomer)

router.route("/customers/:id")
    .get(AuthController.protect,AuthController.restrictTo(['Admin','Customer']),customerController.getCustomerById)
    .patch(AuthController.protect,AuthController.restrictTo(['Admin','Customer']),customerController.updateCustomer)
    .delete(AuthController.protect,AuthController.restrictTo(['Admin','Customer']),customerController.deleteCustomerAccount)
    .delete(AuthController.protect,AuthController.restrictTo(['Admin','Customer']),AuthController.deactivateCustomerAcc)
    
    
router
    .route("/drivers/")    
    .get(AuthController.protect,AuthController.restrictTo(['Admin']),driverController.getAllDrivers)
    .post(AuthController.protect,AuthController.restrictTo(['Admin']),driverController.createDriver)

router.route("/UpdateDriverLocation")
      .post(AuthController.protect,AuthController.restrictTo(['Admin','Driver']),AuthController.protect,driverController.updateDriverLocation)    



// router
//     .route("/drivers/:lastName")
//     .get(driverController.getDriver)    
//     .patch(driverController.updateDriver)

router.route("/drivers/:id")
    .get(AuthController.protect,AuthController.restrictTo(['Admin','Driver']),driverController.getDriverByID)
    .patch(AuthController.protect,AuthController.restrictTo(['Admin','Driver']),driverController.updateDriver)
    .delete(AuthController.protect,AuthController.restrictTo(['Admin','Driver']),driverController.deleteDriverAccount)
    .delete(AuthController.protect,AuthController.restrictTo(['Admin','Driver']),AuthController.deactivateDriverAcc)
    



    //end points
router.use("/dustbin", require('../controllers/dustbinController'))    
router.use("/vehicle", require('../controllers/vehicleController'))    
router.use("/task", require('../controllers/taskController'))    
router.use("/feedback", require('../controllers/feedbackController'))   
 



module.exports = router;