const express=require("express");
const router=express.Router();


router.get("/posts",(req,res)=>{
    res.send("route for posts");
});
router.get("/",(req,res)=>{
    res.send("route for post id");
});
router.post("/",(req,res)=>{
    res.send("post route for post ");
});
router.delete("/",(req,res)=>{
    res.send("delete route for posts");
});

module.exports=router;