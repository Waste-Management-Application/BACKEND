const Feedback = require('../model/feedback');
//const Customer = require('../models/customer');

// Create a new feedback
async function createFeedback (req) {
  try {
    const feedback = await Feedback.Feedback.create({
        message:req.body.message,
        starsNo:req.body.starsNo,
        customer:req.body.customer
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
    const result = await Feedback.Feedback.find().populate({path:'customer', select:['firstName','lastName']});
    return {
        status: "success",
        message: "successfully retrieved feedbacks",
        results : result.length,
        data: result
        }
}


// Create a new complaint
async function createComplaint (req) {
    try {
      const feedback = await Feedback.Complaint.create({ 
          message:req.body.message,
          customer:req.body.customer
          
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
      const result = await Feedback.Complaint.find().populate({path:'customer', select:['firstName','lastName']});
      return {
          status: "success",
          message: "successfully retrieved feedbacks",
          results : result.length,
          data: result
          }
  }
  
  

module.exports = { createFeedback, getAllFeedbacks,createComplaint, getAllComplaint };
