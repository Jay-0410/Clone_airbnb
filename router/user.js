const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {renderSignupForm, signupUser, renderLoginForm,loginUser,logoutUser} = require("../controllers/users");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup", renderSignupForm)

router.post("/signup", wrapAsync(signupUser));

router.get("/login", renderLoginForm);

router.post("/login",
    saveRedirectUrl ,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    loginUser    
);

router.get("/logout" , logoutUser);

module.exports = router;