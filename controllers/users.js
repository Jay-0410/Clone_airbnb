const User = require("../models/user");

module.exports.renderSignupForm = (req,res,next) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async(req,res,next) => {
    try{
        let {email, username,password} = req.body;
        let registeredUser = await User.register(new User({
            email:email,
            username:username
        }),password);
        req.login(registeredUser , (err) => {
            if(err){
                next(err);
            }
            req.flash("success" , "new user created!");
            res.redirect("/listings");
        })
    } catch (error) {
        console.log(error);
        if (error.name === "UserExistsError"){
            req.flash("error","A user already exists with given username.");
            res.redirect("/signup");
        } else{
            req.flash("error", "Oh dear, something went wrong. Call Jay or you are going to died.")
            res.redirect("/signup");
        }
    }
}

module.exports.renderLoginForm = (req,res,next) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async(req,res,next) => {
    let redirectUrl = res.locals.redirectUrl || "/listings";
    req.flash("success" , `Welcome back ${req.body.username}!`);
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res,next) => {
    req.logout( (err) => {
        if(err) {
            next(err);
        }
        req.flash("success" , "Successfuly logged out!");
        res.redirect("/listings");
    })
};