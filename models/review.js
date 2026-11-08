
let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const User=require("./User.js");
let reviewSchema= new Schema({
comment:{
    type:String,
},
rating:{
    type: Number,
    min:1,
    max:5
},
createdAt:{
type:Date,
default:Date.now,
},
owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
}
});
let Review=mongoose.model("Review",reviewSchema);
module.exports=Review;