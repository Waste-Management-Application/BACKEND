const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);




const dustbinSchema = new mongoose.Schema({
      
      dustbinNo:{
        type: Number,
        //required: true,
        unique:true
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




dustbinSchema.plugin(autoIncrement.plugin,{
  model: 'Dustbin',
  field: 'dustbinNo',
  startAt: 1,
  incrementBy: 1, 
})

const dustbinRequestSchema= new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },

  location: {
    type: String,
    required:false
  },

  requestDate: {
    type:Date,
    default:Date.now()
  },
  status: {
    type:String, default:"pending"}
});

const Dustbin = mongoose.model("Dustbin",dustbinSchema)


const dustbinRequest = mongoose.model("dustbinRequest",dustbinRequestSchema )
module.exports = {
  Dustbin, dustbinRequest
}