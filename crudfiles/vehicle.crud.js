//const uuid = require('uuid');
const Vehicle = require ("../model/vehicle")

async function createNewVehicle(req){
    try{
        const newVehicle = await Vehicle.create({
            //location:req.body.location,
            vehicleNo:req.body.vehicleNo,
            driver:req.body.driver
            //vehicleID: uuid()
        });
        if(newVehicle === null){
            return{
                status:'failed',
                message:'unable to create vehicle'
            }
        }
        return {
            status: "success!",
            message: "vehicle created successfully",
            data : newVehicle
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

    //get all vehicles
async function getAllVehicles(){
    const result =await Vehicle.find().populate('driver','name')

    return{
        status: "success",
        message: "successfully retrieved vehicles",
        results: result.length,
        data: result
    }
}    

// // get vehicle by vehicleID

// async function getVehicleDetails(req){
//     const id = req.params.id
//     try{
//         const result = await Vehicle.findOne({_id: id})
//         if(result===null){
//             return{
//                 status:"failed" , 
//                 message: "vehicle not found"
//             }
//         }
//         return {
//             status : "success",
//             message: "vehicle found",
//             data : result
//         }
//     }
//     catch(error){
//         return {status : "error" , 
//         message : "an error occured, please try again"}
//     }
// }

// async function deleteVehicleByID(){
//     const id = req.params.id
//     try{
//         const result = await Vehicle.deleteOne({_id: id})
//         if(result===null){
//             return{
//                 status:"failed" , 
//                 message: "vehicle not deleted"
//             }
//         }
//         return {
//             status : "success",
//             message: "vehicle deleted",
//             data : result
//         }
//     }
//     catch(error){
//         return {status : "error" , 
//         message : "an error occured, please try again"}
//     }
    

// } 

module.exports= {
   getAllVehicles,
   createNewVehicle
}


