const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    let listing = await Listing.findById(req.params.id);
    let newReview = await new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "Review created!");
    res.redirect(`${baseUrl}/listings/${listing._id}`);
};

module.exports.deleteReview = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review deleted!")
    res.redirect(`${baseUrl}/listings/${id}`);
};