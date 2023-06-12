const mongoose = require('mongoose')

const dustbinSchema = new mongoose.Schema({
      location: {
        type: String,
        required:false
      },

      dustbinNo:{
        type: Number,
        required: true
      },

      // dustbinID:{
      //   type: String,
      //   required:false

      // },

      DateCreated: {
        type:Date,
        default: Date.now()
    }

      

})

const dustbinRequestSchema= new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  requestDate: Date,
  status: {
    type:String, default:"pending"}
});

const Dustbin = mongoose.model("Dustbin",dustbinSchema)
module.exports = Dustbin;

const dustbinRequest = mongoose.model("dustbinRequest",dustbinRequestSchema )
module.exports = dustbinRequest;