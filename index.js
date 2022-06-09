if(process.env.NODE_ENV!=="production"){
  require("dotenv").config();
}

const express=require("express");
const app=express();
const path=require("path");
const {v4:uuid}=require("uuid");

const mongoose=require("mongoose");
const Customer=require("./models/customers");
const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/customerInfo';
mongoose.connect(dbUrl)
  .then(()=>{
    console.log("Connection Open");
  })
  .catch(err=>{
    console.log(`Error ${err}`)
  })

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.get("/",(req,res)=>{
  res.render("bank.ejs")
}) 

app.get("/customers",async (req,res)=>{
  const customers=await Customer.find({});
  res.render("customers.ejs",{customers})
})

app.post("/customers",async (req,res)=>{
  const {senderID,receiverID,amount}=req.body
  console.log(req.body);
  await Customer.findByIdAndUpdate(senderID,{$inc:{balance:-parseInt(amount)}});
  await Customer.findByIdAndUpdate(receiverID,{$inc:{balance:parseInt(amount)}});
  // sender.balance-=parseInt(amount);
  // receiver.balance+=parseInt(amount);
  res.redirect("/customers");
})

app.get("/transfer",(req,res)=>{
  res.render("transfer.ejs")
})

app.post("/show",async (req,res)=>{
  const {id}=req.body;
  const person=await Customer.findById(id);
  res.render("show.ejs",{person});
})

const port=process.env.PORT||3000;
app.listen(port,()=>{
  console.log(`App is listening on port ${port}`);
})