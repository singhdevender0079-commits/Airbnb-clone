let express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const flash = require("connect-flash");
const User = require("../models/User.js");
const passport = require("passport");
const userController=require("../controllers/users.js");
//! signup
router.get("/signup", userController.renderSignupForm);


router.post("/signup", wrapAsync(userController.postSignupForm ));

//* login
router.get("/login",userController.renderLoginForm );


router.post("/login", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),
    wrapAsync(userController.postLoginForm));



    //* logout route
    router.get("/logout",userController.renderLogout);
module.exports = router;