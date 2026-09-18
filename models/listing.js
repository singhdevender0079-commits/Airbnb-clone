let mongoose = require("mongoose");
let listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default:"https://images.unsplash.com/photo-1688653802629-5360086bf632?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
set: (v)=>
v ===""? "https://images.unsplash.com/photo-1688653802629-5360086bf632?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
:v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

let Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
