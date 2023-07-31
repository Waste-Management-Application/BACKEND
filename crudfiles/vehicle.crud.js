//const uuid = require('uuid');
const Vehicle = require ("../model/vehicle")

async function createNewVehicle(req){
    try{
        const newVehicle = await Vehicle.create({
            //location:req.body.location,
            // vehicleNo:req.body.vehicleNo,
            // driver:req.body.driver
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
                message: "An error occured, please try again later",
            };
        }

}

    //get all vehicles
async function getAllVehicles(){
    const result = await Vehicle.find()

    return{
        status: "success",
        message: "successfully retrieved vehicles",
        results: result.length,
        data: result
    }
}    

async function updateVehicle(req) {
    try {
      const id = req.params.id;
      const { driverName } = req.body; // Assuming you want to update the driverName field
  
      // Find the vehicle by ID and update the driver reference
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        { driver: driverName }, // Update the driverName field with the new value
        { new: true } // Set the 'new' option to true to return the updated vehicle
      );
  
      if (!updatedVehicle) {
        return {
          status: 'failed',
          message: 'Vehicle not found',
        };
      }
  
      return {
        status: 'success',
        message: 'Vehicle updated successfully',
        data: updatedVehicle,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 'error',
        message: 'Failed to update vehicle',
      };
    }
  }

module.exports= {
   getAllVehicles,
   createNewVehicle,
   updateVehicle
}


