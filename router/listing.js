const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateListing ,isLoggedIn, isOwner } = require("../middleware.js");
const {index, renderNewListingForm, createListing, showListing, renderEditListingForm, updateListing, deleteListing} = require("../controllers/listings");

// Index Route
router.get("/" , wrapAsync(index));

// New Route
router.get("/new", isLoggedIn , renderNewListingForm);

// Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(createListing));    

// Show Route
router.get("/:id", wrapAsync(showListing));

// EDIT Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditListingForm));

//UPDATE Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(updateListing));

//DELETE Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;