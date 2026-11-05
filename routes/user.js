let express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const flash = require("connect-flash");
const User = require("../models/User.js");
const passport = require("passport");
//! signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
});
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerdUser = await User.register(newUser, password);
        req.flash("succes", "welcome to airbnb");
        res.redirect("/listings");
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

//* login

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});
router.post("/login", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),
    wrapAsync(async (req, res) => {
        req.flash("succes", "welcome back to Airbnb");
        res.redirect("/listings");
    }));
    //! logout route
    router.get("/logout",(req,res,next)=>{
req.logout((err)=>{
    if(err){
      return  next(err);
    }
    req.flash("succes","you logged out successfully");
    res.redirect("/listings");
})
    });

module.exports = router;