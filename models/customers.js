const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  balance:{
    type:Number,
    required:true,
    min:0
  }
})

const Customer=mongoose.model("Customer",customerSchema);
module.exports=Customer;