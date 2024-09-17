const mongoose = require("mongoose");

const listing_schema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String
    },
    image : {
       filename : String,
       url : {
        type : String,
        link : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/ee/00/88/tennis-court-vila-do.jpg?w=700&h=-1&s=1",
        default : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/ee/00/88/tennis-court-vila-do.jpg?w=700&h=-1&s=1",
        set : (v) => v === "" ? this.link : v
       }
    },
    price : Number,
    location : String,
    country : String 
})

const Listing = mongoose.model("Listing" , listing_schema);

module.exports = Listing;