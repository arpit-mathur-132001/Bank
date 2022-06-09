const mongoose=require("mongoose");
const Customer=require("./models/customers");
mongoose.connect('mongodb://localhost:27017/customerInfo')
  .then(()=>{
    console.log("Connection Open");
  })
  .catch(err=>{
    console.log(`Error ${err}`)
  })

const seedCustomers=[
  {
    name:"Arpit",
    email:"arpit.mathur@gmail.com",
    balance:100
  },
  {
    name:"Naman",
    email:"namanmathur@gmail.com",
    balance:1000
  },
  {
    name:"VPSC",
    email:"vpsc@gmail.com",
    balance:500
  },
  {
    name:"Ayush",
    email:"ayush@hotmail.com",
    balance:1200
  }
]

Customer.insertMany(seedCustomers)
  .then(c=>{
  console.log(c);
  })
  .catch(e=>{
  console.log("Error");
  })