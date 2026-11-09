const User=require("../models/User.js");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs")
};

module.exports.postSignupForm=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerdUser = await User.register(newUser, password);
        
        //*to perform automatically login after signup operation
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
    req.flash("succes", "welcome to airbnb");
        res.redirect("/listings");
        })
    
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.postLoginForm=async (req, res) => {
        req.flash("succes", "welcome back to Airbnb");
        res.redirect("/listings");
    };

    module.exports.renderLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("succes","you logged out successfully");
        res.redirect("/listings");
    })
        };