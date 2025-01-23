const {listingSchema} = require("./schema");
const {reviewSchema} = require("./schema");
const ExpressError = require("./ExpressError");

let validate = {
    listing : (req,res,next) => {
        console.log("validating Listing.")
        let {error} = listingSchema.validate(req.body);
        if(error) {
            throw new ExpressError(400 , error);
        }else {
            next();
        }
    },
    review : (req,res,next) => {
        console.log("Validating review.")
        let {error} = reviewSchema.validate(req.body);
        if(error) {
            throw new ExpressError(400 , error);
        } else{
            next();
        }
    }
}

module.exports = validate;