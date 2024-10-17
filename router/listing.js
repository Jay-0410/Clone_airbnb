const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const validate = require("../utils/validate.js");
const ExpressError = require("../utils/ExpressError");

// Index Route
router.get("/" , wrapAsync(async (req , res,next) => {
    const all_listings = await Listing.find({});
    res.render("./listings/index.ejs", {all_listings});
}));
// New Route
router.get("/new" , (req, res) => {
    res.render("./listings/new.ejs");
})
// Create Route
router.post("/", validate.listing, wrapAsync(async(req,res,next) => {
    const {listing} = req.body;
    await new Listing(listing).save()
        .then(res => console.log(`${res.title} has been CREATED.`))
    req.flash("success" , "New listing Created.");
    res.redirect("/listings");
}));    
// Show Route
router.get("/:id", wrapAsync(async (req , res,next) => {
    const {id} = req.params;
    
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect("/listings");
    }

    res.render("./listings/show.ejs" , {listing} );
}))
// EDIT Route
router.get("/:id/edit", wrapAsync(async(req,res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs",{listing});
}));
//UPDATE Route
router.put("/:id", validate.listing, wrapAsync(async(req,res,next) => {
    const {id} = req.params;
    const {listing} = req.body;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success" , "Listing updated!");
    res.redirect(`/listings/${id}`);
}));
//DELETE Route
router.delete("/:id", wrapAsync(async(req,res,next) => {
    const{id} = req.params;
    await Listing.findByIdAndDelete(id)
        .then(res => console.log(`${res.title} has been deleted.`));
    req.flash("success" , "Listing deleted!");
    res.redirect("/listings");
}));


module.exports = router;