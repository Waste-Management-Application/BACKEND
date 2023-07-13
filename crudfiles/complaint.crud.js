const Complaint = require('../model/complaint');
//const Customer = require('../models/customer');

// Create a new complaint
async function createComplaint (req) {
  try {
    const feedback = await Complaint.create({
        customer:req.body.customer, 
        message:req.body.message,
        

    })
       
     if(feedback === null){
            return {
                status: 'failed',
                message: 'unable to send feedbacks'
            }
        }
        return {
            status: "success",
            message: "feedbacks sent successfully",
            data : feedback
        };
        }
        catch(err){
            console.log(err)
            return{
                status: "error",
                message: "An error occured, please try again later",
        };
        }
}


// Get all feedbacks with customer details
async function getAllComplaint() {
    const result = await Complaint.find().populate({path:'customer', select:['firstName','lastName']});
    return {
        status: "success",
        message: "successfully retrieved feedbacks",
        results : result.length,
        data: result
        }
}


module.exports = { createComplaint, getAllComplaint };