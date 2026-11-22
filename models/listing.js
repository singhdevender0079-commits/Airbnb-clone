let mongoose = require("mongoose");
const Review = require("./review.js");
const User=require("./User.js");
let listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String
  },
  image: {
url:String,
filename:String
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
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }],
owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
},
geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }
  
});



let Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
