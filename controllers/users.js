const User = require("../models/user");

module.exports.renderSignupForm = (req,res,next) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
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
            res.redirect(`${baseUrl}/listings`);
        })
    } catch (error) {
        console.log(error);
        if (error.name === "UserExistsError"){
            req.flash("error","A user already exists with given username.");
            res.redirect(`${baseUrl}/signup`);
        } else{
            req.flash("error", "Oh dear, something went wrong. Call Jay or you are going to died.")
            res.redirect(`${baseUrl}/signup`);
        }
    }
}

module.exports.renderLoginForm = (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    res.render("users/login.ejs", {baseUrl});
};

module.exports.loginUser = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    console.log(res.locals.redirectUrl);
    if(!res.locals.redirectUrl) {
        res.locals.redirectUrl = `${baseUrl}/listings`;
    }
    let redirectUrl = `${res.locals.redirectUrl}`;
        req.flash("success" , `Welcome back ${req.body.username}!`);
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    req.logout( (err) => {
        if(err) {
            next(err);
        }
        req.flash("success" , "Successfuly logged out!");
        res.redirect(`${baseUrl}/listings`);
    })
};