const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {renderSignupForm, signupUser, renderLoginForm,loginUser,logoutUser} = require("../controllers/users");
const wrapAsync = require("../utils/wrapAsync");

router
    .route("/signup")
    .get(renderSignupForm)
    .post(wrapAsync(signupUser))

router
    .route("/login")
    .get(renderLoginForm)
    .post(
        saveRedirectUrl ,
        passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
        loginUser    
    )

router.get("/logout" , logoutUser);

module.exports = router;