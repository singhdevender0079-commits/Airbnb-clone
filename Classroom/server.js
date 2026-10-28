const express=require("express");
const app=express();
const posts=require("./routes/post.js");
const users=require("./routes/user.js");
const port=3000;
app.get("/",(req,res)=>{
    res.send("jai peeran di");
});
app.use("/posts/:id",posts)
app.use("/users/:id",users);

app.listen(port,()=>{
    console.log("app is listening at port 3000");
});



