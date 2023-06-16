const customerController = require("../controllers/customerController")
const driverController = require("../controllers/driverController")
const AuthController = require('../controllers/AuthController')
//const Customers = require ('../model/customer')
//const Driver = require ('../model/driver')

const express = require('express')


const router = express.Router()

router.post("/customerSingUp", AuthController.customerSignUp)
router.post("/driverSingUp", AuthController.driverSignUp)
router.post("/customerSignIn", AuthController.customerSignIn)

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
    



    //end points
router.use("/dustbin", require('../controllers/dustbinController'))    
router.use("/vehicle", require('../controllers/vehicleController'))    
router.use("/task", require('../controllers/taskController'))    
router.use("/feedback", require('../controllers/feedbackController'))    



module.exports = router;