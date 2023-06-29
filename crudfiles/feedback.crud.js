const Feedback = require('../model/feedback');
//const Customer = require('../models/customer');

// Create a new feedback
async function createFeedback (req) {
  try {
    const feedback = await Feedback.create({
        customer:req.body.customer, 
        message:req.body.message,
        starsNo:req.body.starsNo 

    })
       
     if(feedback === null){
            return {
                status: 'failed',
                message: 'unable to send feedback'
            }
        }
        return {
            status: "success",
            message: "feedback sent successfully",
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
async function getAllFeedbacks() {
    const result = await Feedback.find().populate({path:'customer', select:['firstName','lastName']});
    return {
        status: "success",
        message: "successfully retrieved feedbacks",
        results : result.length,
        data: result
        }
}


module.exports = { createFeedback, getAllFeedbacks };
