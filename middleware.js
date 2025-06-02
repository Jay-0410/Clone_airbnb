const Listing = require("./models/listing");
const {listingSchema, reviewSchema} = require("./utils/schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in!");
    return res.redirect(`${baseUrl}/login`);
  }
  next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    };
    next();
};

module.exports.isOwner = async (req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    if(!res.locals.loggedInUser._id.equals(listing.owner._id)){
        req.flash("error" , "You don't have permission.");
        console.log(req.originalUrl);
        return res.redirect(`${baseUrl}/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    console.log(review);
    if(!res.locals.loggedInUser._id.equals(review.author._id)){
        req.flash("error" , "You are not Author");
        return res.redirect(`${baseUrl}/listings/${id}`);
    }

    next();
};

module.exports.validateListing = (req,res,next) => {
    console.log("validating Listing.")
    let {error} = listingSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400 , error);
    }else {
        next();
    }
};

module.exports.validateReview = (req,res,next) => {
    console.log("Validating review.")
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400 , error);
    } else{
        next();
    }
}