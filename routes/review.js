let express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

let reviewValidate = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}
router.post("/",isLoggedIn,reviewValidate,wrapAsync(reviewController.postReview));

//! Review Delete

router.delete("/:reviewId",isLoggedIn, wrapAsync(reviewController.deleteReview));
module.exports = router;