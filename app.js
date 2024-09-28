// nodemon app.js  -> cmd
const express = require("express");
const app = express();
const port = 8080;
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

//utils
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {validate} = require("./utils/validate.js");
const { wrap } = require("module");

app.engine("ejs" , ejsMate);
app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(method_override("_method"));

//Database connection
database_connected()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

async function database_connected() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//RESTapi
// Root Route
app.get("/" , (req,res) => {
    res.render("./listings/home.ejs");
})
// Index Route
app.get("/listings" , wrapAsync(async (req , res,next) => {
    const all_listings = await Listing.find({});
    res.render("./listings/index.ejs", {all_listings});
}));
// New Route
app.get("/listings/new" , (req, res) => {
    res.render("./listings/new.ejs");
})
// Create Route
app.post("/listings", validate.listing, wrapAsync(async(req,res,next) => {
    const {listing} = req.body;
    await new Listing(listing).save()
        .then(res => console.log(`${res.title} has been CREATED.`))
    res.redirect("/listings");
}));    
// Show Route
app.get("/listings/:id", wrapAsync(async (req , res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs" , {listing} );
}))
// EDIT Route
app.get("/listings/:id/edit", wrapAsync(async(req,res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));
//UPDATE Route
app.put("/listings/:id", validate.listing, wrapAsync(async(req,res,next) => {
    const {id} = req.params;
    const {listing} = req.body;
    await Listing.findByIdAndUpdate(id, {...listing});
    res.redirect(`/listings/${id}`);
}));
//DELETE Route
app.delete("/listings/:id", wrapAsync(async(req,res,next) => {
    const{id} = req.params;
    await Listing.findByIdAndDelete(id)
        .then(res => console.log(`${res.title} has been deleted.`))
    res.redirect("/listings");
}));

//Review
//CREATE Route
app.post("/listings/:id/reviews", validate.review , wrapAsync(async (req,res,next) => {
    let listing = await Listing.findById(req.params.id);
    let review = await new Review(req.body.review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));
//DELETE Route
app.delete("/listings/:id/reviews/:reviewId" , wrapAsync(async(req,res,next) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));
//REST
app.all('*' , (req, res, next) => {
    next( new ExpressError(500 , 'Page not found!'));
});

//Error Handler
app.use((err,req,res,next) => {
    let {status = 500, message="Something wrong happened.\nContact to Experts!"} = err;
    res.status(status).render("./err" , {message});
})

app.listen(port , () => {
    console.log("App is running on Port:"+port);
} )