const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");

const Listing = require("./models/listing.js");


app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");

app.use(express.urlencoded({extends : true}));
app.use(express.json());

database_connected()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));


async function database_connected() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// Root Route
app.get("/" , (req,res) => {
    res.send("Welcome and Wait!");
})

// Index Route
app.get("/listings" , async (req , res) => {
    const all_listings = await Listing.find({});
    res.render("./listings/index.ejs", {all_listings});
})
// New Route
app.get("/listings/new" , (req, res) => {
    res.render("./listings/new.ejs");
})
// Show Route
app.get("/listings/:id" , async (req , res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs" , {listing} );
})
// Create Route
app.post("/listings" , async(req,res) => {
    const {listing} = req.body;
    await new Listing(listing).save()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    console.log("new listing added to DB :)")
    res.redirect("/listings");
})



app.listen(port , () => {
    console.log("App is running on Port:"+port);
} )