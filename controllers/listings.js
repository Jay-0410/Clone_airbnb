const Listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken : mapToken});


module.exports.index = async (req , res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const all_listings = await Listing.find({});
    res.render("./listings/index.ejs", {all_listings, baseUrl});
};

module.exports.renderNewListingForm = (req, res) => {
    const baseUrl = req.app.locals.baseUrl || '';
    res.render("./listings/new.ejs", {baseUrl});
};

module.exports.createListing = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const geoData = await geocodingClient.forwardGeocode({
        query : req.body.listing.location,
        limit : 1
    }).send();
    
    let url = req.file.path;
    let filename = req.file.filename;
    const {listing} = req.body;
    listing.owner = req.user._id;
    listing.image = {url : url , filename : filename};
    listing.geometry = geoData.body.features[0].geometry;

    let savedListing = await new Listing(listing).save();
    console.log(savedListing);
    req.flash("success" , "New listing Created.");
    res.redirect(`${baseUrl}/listings`);
};

module.exports.showListing = async (req , res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews" , populate : {path : "author"}}).populate("owner");
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect(`${baseUrl}/listings`);
    }
    res.render("./listings/show.ejs" , {listing, baseUrl});
};

module.exports.renderEditListingForm = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing || listing === "null") {
        req.flash("error" , "Listing does not exist!");
        res.redirect(`${baseUrl}/listings`);
    }
    let originalImageUrl = listing.image.url.replace("/upload" , "/upload/w_250");
    res.render("./listings/edit.ejs",{listing , originalImageUrl, baseUrl: req.app.locals.baseUrl || ''});
};

module.exports.updateListing = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const {id} = req.params;
    const {listing} = req.body;
    let newLisitng = await Listing.findByIdAndUpdate(id, listing);

    if(typeof req.file !== "undefined") {
        newLisitng.image = {url : req.file.path , filename : req.file.filename};
        await newLisitng.save();
    }

    req.flash("success" , "Listing updated!");
    res.redirect(`${baseUrl}/listings/${id}`);
};

module.exports.deleteListing = async(req,res,next) => {
    const baseUrl = req.app.locals.baseUrl || '';
    const{id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success" , "Listing deleted!");
    res.redirect(`${baseUrl}/listings`);
};