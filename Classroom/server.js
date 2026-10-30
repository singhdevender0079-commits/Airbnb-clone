const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
const session = require("express-session");
const flash = require('connect-flash');
const path=require("path");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.send("jai peeran di");
});

const sessionOptions={
       secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
}
app.use(flash());
app.use(session(sessionOptions));
app.get("/register",(req,res)=>{
    const {name}=req.query;
    req.session.name=name;
    req.flash("succes","new user registerd succesfully !");
    console.log(req.session.name);

    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name,msg:req.flash("succes")});
});

app.get("/test", (req, res) => {
    res.send("tested succesfully");
});

app.use("/posts/:id", posts);
app.use("/users/:id", users);

// //! WEB Cookies -->
// //!cookie parser --> 2
// app.get("/printcookie",(req,res)=>{
//     console.dir(req.cookies);
//         let {madeIn}=req.cookies;
//         res.send(`ye na mere  ${madeIn} main bana hai`);
// });

// //! Sending cookies --> 1
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","jai peeran di");
//     res.send("web cookies sent to you");
// });

// // ! Signed cookies --> 3
// app.get("/printSignedCookie",(req,res)=>{
//     res.send("singned cookie print");
//     console.dir(req.signedCookies);
// })

// app.get("/signedcookie",(req,res)=>{
//     res.cookie("madeIn","india",{signed:true});
//     res.send("singed cookies sent to you");
// });

app.listen(port, () => {
    console.log("app is listening at port 3000");
});



