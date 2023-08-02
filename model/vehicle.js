const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: false,
  },

  vehicleNo: {
    type: String,
    required: false,
    unique: true,
  },

  DateCreated: {
    type: Date,
    default: Date.now(),
  },
});

// Custom pre-save middleware to generate unique vehicle numbers
vehicleSchema.pre('save', async function (next) {
  if (!this.vehicleNo) {
    // Your logic to generate the vehicle number here
    // For example, you can use a function that generates a unique number based on the current date/time, or any other custom logic you prefer.
    const generatedVehicleNo = generateUniqueVehicleNumber();
    this.vehicleNo = generatedVehicleNo;
  }
  next();
});

function generateUniqueVehicleNumber() {
  // Generate a random number between 1 and 999
  const randomNumber = Math.floor(Math.random() * 999) + 1;

  // Pad the random number with leading zeros to ensure it has three digits
  const paddedNumber = randomNumber.toString().padStart(3, '0');

  // Combine the prefix 'DST' with the padded random number to create the dustbin number
  const vehicleNumber = `VEH${paddedNumber}`;

  return vehicleNumber;
}

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
