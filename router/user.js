const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/signup", (req,res,next) => {
    res.render("users/signup.ejs");
})

router.post("/signup", async(req,res,next) => {
    try{
        let {email, username,password} = req.body;
        let registeredUser = await User.register(new User({
            email:email,
            username:username
        }),password);
        console.log(registeredUser);
        req.flash("success" , "new user created!");
        res.redirect("/login");
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
})

router.get("/login", (req,res,next) => {
    res.render("users/login.ejs");
})

router.post("/login",
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}), 
    async(req,res,next) => {
    req.flash("success" , `Welcome back ${req.body.username}!`);
    res.redirect("/listings");
});

module.exports = router;