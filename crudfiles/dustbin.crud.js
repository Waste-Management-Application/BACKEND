const Dustbin = require ("../model/dustbin")
// const dustbinRequest = require("../model/dustbin")
//const uuid = require('uuid');

//Create a new dustbin
async function createNewDustbin(req){
    try{
        const newDustbin = await Dustbin.Dustbin.create({
            //location:req.body.location,
            // field:'dustbinNo'
            //dustbinID: uuid()
        });
        if(newDustbin === null){
            return{
                status:'failed',
                message:'unable to create dustbin'
            }
        }
        return {
            status: "success",
            message: "dustbin created successfully",
            data : newDustbin
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

//NEW//Create new dustbin request
async function createNewDustbinRequest(req){
    try{
        const NewDustbinRequest = await Dustbin.dustbinRequest.create({
            
            customer:req.body.customer,
            // status:req.body.status

        
        });
        if(NewDustbinRequest === null){
            return{
                status:'failed',
                message:'unable to send request'
            }
        }
        return {
            status: "success",
            message: "Request sent successfully",
            data : NewDustbinRequest
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

// Get all customers who requested bins
async function getAllDustbinRequest() {
    const result = await Dustbin.dustbinRequest.find().populate({path:'customer', select:['firstName', 'lastName','location']});
    return {
        status: "success",
        message: "successfully retrieved all requests",
        results : result.length,
        data: result
        }
}



//NEW//Create new pickup request
async function createNewPickupRequest(req){
    try{
        const NewPickupRequest = await Dustbin.Pickup.create({
            
            customer:req.body.customer,
            // status:req.body.status

        
        });
        if(NewPickupRequest === null){
            return{
                status:'failed',
                message:'unable to send request'
            }
        }
        return {
            status: "success",
            message: "Request sent successfully",
            data : NewPickupRequest
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

// Get all customers who requested pickups
async function getAllPickupRequest() {
    const result = await Dustbin.Pickup.find().populate({path:'customer', select:['firstName', 'lastName','location']});
    return {
        status: "success",
        message: "successfully retrieved all requests",
        results : result.length,
        data: result
        }
}

//Changing status of dustbin request
async function changeDustbinRequestStatus(req){
    try {
        const id = req.params.id;
        const dustbinRequest = await Dustbin.dustbinRequest.findById({_id:id});
    
        if (!dustbinRequest) {
            return{
                status:'failed',
                message:'unable to change status'
            }
        }
    
        // Update the status of the dustbin request to 'served'
        dustbinRequest.status = "served";
    
        // Save the updated dustbin request in the database
        await dustbinRequest.save();

        return {
            status: "success",
            message: "dustbin request successfully served",
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


//Changing status of Pickup request
async function changePickupRequestStatus(req){
    try {
        const id = req.params.id;
        const PickupRequest = await Dustbin.Pickup.findById({_id:id});
    
        if (!PickupRequest) {
            return{
                status:'failed',
                message:'unable to change status'
            }
        }
    
        // Update the status of the pickup request to 'served'
        PickupRequest.status = "served";
    
        // Save the updated pickup request in the database
        await PickupRequest.save();

        return {
            status: "success",
            message: "Pickup request successfully served",
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




    //get all dustbins
async function getAllDustbins(){
    const result =await Dustbin.Dustbin.find()

    return{
        status: "success",
        message: "successfully retrieved dustbins",
        results: result.length,
        data: result
    }
}    



module.exports= {
    getAllDustbins,
    createNewDustbin,
    createNewDustbinRequest,
    getAllDustbinRequest,
    getAllPickupRequest,
    createNewPickupRequest,
    changeDustbinRequestStatus,
    changePickupRequestStatus
    
}


