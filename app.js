const express = require("express");
const app = express();
const port = 8080;
const method_override = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

const Listing = require("./models/listing.js");

app.engine("ejs" , ejsMate);

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(method_override("_method"));

//Database connection
database_connected()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

async function database_connected() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//RESTapi
// Root Route
app.get("/" , (req,res) => {
    res.render("./listings/home.ejs");
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
// Create Route
app.post("/listings" , async(req,res) => {
    const {listing} = req.body;
    await new Listing(listing).save()
        .then(res => console.log(`${res.title} has been CREATED.`))
        .catch(err => console.log(err));
    console.log("new listing added to DB :)")
    res.redirect("/listings");
})
// Show Route
app.get("/listings/:id" , async (req , res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs" , {listing} );
})
// EDIT Route
app.get("/listings/:id/edit" , async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
})
//UPDATE Route
app.put("/listings/:id" ,async(req,res) => {
    const {id} = req.params;
    const {listing} = req.body;
    await Listing.findByIdAndUpdate(id, {...listing});
    res.redirect(`/listings/${id}`);
})
//DELETE Route
app.delete("/listings/:id" ,async(req,res) => {
    const{id} = req.params;
    await Listing.findByIdAndDelete(id)
        .then(res => console.log(`${res.title} has been deleted.`))
        .catch(err => console.log(err));
    res.redirect("/listings");
});



app.listen(port , () => {
    console.log("App is running on Port:"+port);
} )