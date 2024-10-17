const express = require("express");
const router = express.Router({mergeParams:true});

//models
const Listing = require("../models/listing");
const Review = require("../models/review");

//utils
const validate = require("../utils/validate");
const wrapAsync = require("../utils/wrapAsync");

//CREATE Route
router.post("/", validate.review , wrapAsync(async (req,res,next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = await new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "Review created!");
    res.redirect(`/listings/${listing._id}`);
}));
//DELETE Route
router.delete("/:reviewId" , wrapAsync(async(req,res,next) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review deleted!")
    res.redirect(`/listings/${id}`);
}));

module.exports = router;