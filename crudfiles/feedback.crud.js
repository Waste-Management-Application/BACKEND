//const uuid = require('uuid');
const feedback = require ("../model/feedback")


async function createNewFeedback(req){
    try{
        const newFeedback = await feedback.create({
            message:req.body.message,
            starsNo:req.body.starsNo
            
        });
        if(newFeedback === null){
            return{
                status:'failed',
                message:'unable to send feedback'
            }
        }
        return {
            status: "success!",
            message: "feedback successfully sent",
            data : newFeedback
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

//get all Feedbcks
async function getAllFeedbacks(){
    const result = await feedback.find()

    return{
        status: "sucess",
        message: "successfully retrieved Feedbacks",
        results: result.length,
        data: result
    }
}    


module.exports={
    getAllFeedbacks,
    createNewFeedback
}
