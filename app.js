if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
// nodemon app.js  -> cmd
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const app = express();
app.locals.baseUrl = '/wonderlust';
const port = 8080;
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//Routes
const listingRouter = require("./router/listing.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");

//utils
const ExpressError = require("./utils/ExpressError.js");

//Step1
app.engine("ejs" , ejsMate);
app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(method_override("_method"));

const Mongo_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
//Database connection
database_connected()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));
async function database_connected() {
    return await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24*60*60
})

store.on("error" , () => {
    console.log("Session store error");
});

//step2
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000*60*60*24*3,
        maxAge :  1000*60*60*24*3,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

//Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flashing messages
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.loggedInUser = req.user;
    next();
})

//All Routes
app.get("/wonderlust" , (req,res) => {
    res.render("./listings/home.ejs");
}) 

app.use(`${app.locals.baseUrl}/`, userRouter)
app.use(`${app.locals.baseUrl}/listings` , listingRouter);
app.use(`${app.locals.baseUrl}/listings/:id/reviews` , reviewRouter);

app.all('*' , (req, res, next) => {
    next( new ExpressError(500 , 'Page not found!'));
});

//Error Handler
app.use((err,req,res,next) => {
    let {status = 500, message="Something wrong happened.\nContact to Experts!"} = err;
    res.status(status).render("./err" , {message});
})

//listniging port
app.listen(port , () => {
    console.log("App is running on Port:"+port);
} )