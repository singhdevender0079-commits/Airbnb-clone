const express=require("express");
const router=express.Router();

router.get("/users",(req,res)=>{
    res.send("route for users");
});
router.get("/",(req,res)=>{
    res.send("route for users id");
});
router.post("/",(req,res)=>{
    res.send("post route for users ");
});
router.delete("/",(req,res)=>{
    res.send("delete route for user");
});
module.exports=router;