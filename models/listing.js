const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listing_schema = new Schema({
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
    country : String ,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

listing_schema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})
const Listing = mongoose.model("Listing" , listing_schema);

module.exports = Listing;