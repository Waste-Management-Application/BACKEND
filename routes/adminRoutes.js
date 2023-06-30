
const AuthController = require('../controllers/AuthController')

const express = require('express')
const router = express.Router()

// adminRoutes.post('/Admin', (req, res) => {
//     res.send('This is an example route for the admin');
//   });

router
        .post("/adminSignUp", AuthController.adminSignUp)
        .post("/adminSignIn", AuthController.adminSignIn)
        .delete("/deleteAdmin/:id", AuthController.deleteAdminAccount )
        .patch("/UpdateAdmin/:id", AuthController.updateAdminAcc)

    
module.exports = router;