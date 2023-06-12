const dustbin = require ("../model/dustbin")
//const uuid = require('uuid');

//Create a new dustbin
async function createNewDustbin(req){
    try{
        const newDustbin = await dustbin.create({
            //location:req.body.location,
            dustbinNo:req.body.dustbinNo
            //dustbinID: uuid()
        });
        if(newDustbin === null){
            return{
                status:'failed',
                message:'unable to create dustbin'
            }
        }
        return {
            status: "success!",
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
        const NewDustbinRequest = await dustbin.create({
            
            customer:req.body.customer
        
        });
        if(NewDustbinRequest === null){
            return{
                status:'failed',
                message:'unable to send request'
            }
        }
        return {
            status: "success!",
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


    //get all dustbins
async function getAllDustbins(){
    const result =await dustbin.find()

    return{
        status: "sucess",
        message: "successfully retrieved dustbins",
        results: result.length,
        data: result
    }
}    

// get dustbins by dustbinID

async function getDustbinDetails(req){
    const id = req.params.id;
    try{
        const result = await dustbin.findOne({_id: id})
        if(result===null){
            return{
                status:"failed" , 
                message: "dustbin not found"
            }
        }
        return {
            status : "success",
            message: "dustbin found",
            data : result
        }
    }
    catch(error){
        return {status : "error" , 
        message : "an error occured, please try again"}
    }
}

async function deleteDustbinByID(){
    const id = req.params.id;
    try{
        const result = await dustbin.deleteOne({_id: id})
        if(result===null){
            return{
                status:"failed" , 
                message: "dustbin not deleted"
            }
        }
        return {
            status : "success",
            message: "dustbin deleted",
            data : result
        }
    }
    catch(error){
        return {status : "error" , 
        message : "an error occured, please try again"}
    }
    

} 

module.exports= {
    getAllDustbins,
    getDustbinDetails,
    createNewDustbin,
    deleteDustbinByID,
    createNewDustbinRequest
    
}


