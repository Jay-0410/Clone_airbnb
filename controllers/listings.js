const Listing = require("../models/listing");

module.exports.index = async (req , res,next) => {
    const all_listings = await Listing.find({});
    res.render("./listings/index.ejs", {all_listings});
};

module.exports.renderNewListingForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.createListing = async(req,res,next) => {
    const {listing} = req.body;
    listing.owner = req.user._id;
    await new Listing(listing).save()
    req.flash("success" , "New listing Created.");
    res.redirect("/listings");
};

module.exports.showListing = async (req , res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews" , populate : {path : "author"}}).populate("owner");
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs" , {listing} );
};

module.exports.renderEditListingForm = async(req,res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res,next) => {
    const {id} = req.params;
    const {listing} = req.body;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success" , "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res,next) => {
    const{id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success" , "Listing deleted!");
    res.redirect("/listings");
};