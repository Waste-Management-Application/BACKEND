//const uuid = require('uuid');
const Vehicle = require ("../model/vehicle")

async function createNewVehicle(req){
    try{
        const newVehicle = await Vehicle.create({
            //location:req.body.location,
            // vehicleNo:req.body.vehicleNo,
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
            status: "success",
            message: "vehicle created successfully",
            data : newVehicle
        };
        }
        catch(err){
            console.log(err)
            return{
                status: "error",
                message: "Driver ID required",
            };
        }

}

    //get all vehicles
async function getAllVehicles(){
    const result = await Vehicle.find().populate({path:'driver', select:['firstName','lastName']})

    return{
        status: "success",
        message: "successfully retrieved vehicles",
        results: result.length,
        data: result
    }
}    

// async function updateVehicle(req) {
//     try {
//       const { vehicleId, driverId } = req.body;
  
//       // Find the vehicle by ID and update the driver reference
//       const updatedVehicle = await Vehicle.findByIdAndUpdate(
//         vehicleId,
//         { driver: driverId },
//         { new: true }
//       ).populate('driver');
  
//       if (!updatedVehicle) {
//         return {
//           status: 'failed',
//           message: 'Vehicle not found',
//         };
//       }
  
//       return {
//         status: 'success',
//         message: 'Vehicle updated successfully',
//         data: updatedVehicle,
//       };
//     } catch (err) {
//       console.log(err);
//       return {
//         status: 'error',
//         message: 'Failed to update vehicle',
//       };
//     }
//   }
  

module.exports= {
   getAllVehicles,
   createNewVehicle,
//    updateVehicle
}


