const mongoose = require("mongoose");
const {listing_data} = require("./data.js");
const Listing = require("../models/listing.js");

create_connection()
    .then(() => {console.log("Connected to DB")})
    .catch(err => {console.log(err)});

async function create_connection() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

function del_data(Model) {
    Model.deleteMany({})
        .then(res => console.log("Data has been deleted.\nUse init_data() to reinit data!"))
        .catch(err => console.log(err))
}

function init_data(Model , model_data){
    Model.insertMany(model_data)
        .then(res => console.log("Data has been Reinitialised."))
        .catch(err => console.log(err));
}

init_data(Listing,listing_data);
// del_data(Listing);