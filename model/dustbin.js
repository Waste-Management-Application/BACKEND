const mongoose = require('mongoose')

// Create a separate collection to store the dustbin counter
const dustbinCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 },
});

const DustbinCounter = mongoose.model('DustbinCounter', dustbinCounterSchema);


const dustbinSchema = new mongoose.Schema({
  dustbinNo: {
    type: String,
    unique: true,
  },
  DateCreated: {
    type: Date,
    default: Date.now(),
  },
});

dustbinSchema.pre('save', async function (next) {
  if (!this.dustbinNo) {
    const generatedDustbinNo = generateUniqueDustbinNumber();
    this.dustbinNo = generatedDustbinNo;
  }
  next();
});

function generateUniqueDustbinNumber() {
  // Generate a random number between 1 and 999
  const randomNumber = Math.floor(Math.random() * 999) + 1;

  // Pad the random number with leading zeros to ensure it has three digits
  const paddedNumber = randomNumber.toString().padStart(3, '0');

  // Combine the prefix 'DST' with the padded random number to create the dustbin number
  const dustbinNumber = `DST${paddedNumber}`;

  return dustbinNumber;
}

const dustbinRequestSchema= new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true

  },
  requestDate: {
    type:Date,
    default:Date.now()
  },
  status: {
    type:String, default:"pending"}
});


const pickupSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false

  },
  requestDate: {
    type:Date,
    default:Date.now()
  },
  status: {
    type:String, default:"pending"}
}); 

const Dustbin = mongoose.model("Dustbin",dustbinSchema)
const Pickup = mongoose.model("Pickup",pickupSchema)

const dustbinRequest = mongoose.model("dustbinRequest",dustbinRequestSchema )
module.exports = {
  Dustbin, dustbinRequest , Pickup
}