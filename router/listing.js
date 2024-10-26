const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateListing ,isLoggedIn, isOwner } = require("../middleware.js");
const {index, renderNewListingForm, createListing, showListing, renderEditListingForm, updateListing, deleteListing} = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createListing));

router.get("/new", isLoggedIn , renderNewListingForm);

router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditListingForm));

module.exports = router;