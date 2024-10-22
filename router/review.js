const express = require("express");
const router = express.Router({mergeParams:true});

//utils
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn,validateReview, isReviewAuthor } = require("../middleware");
const {createReview, deleteReview} = require("../controllers/reviews");

//CREATE Route
router.post("/", isLoggedIn, validateReview , wrapAsync(createReview));

//DELETE Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor , wrapAsync(deleteReview));

module.exports = router;