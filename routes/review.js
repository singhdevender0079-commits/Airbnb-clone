let express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");

let reviewValidate = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}
router.post("/",
    reviewValidate,
    wrapAsync(async (req, res) => {
        const { id } = req.params;

        const listing = await Listings.findById(id);

        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }
        const newReview = new Review(req.body.review);
        await newReview.save();
        listing.reviews.push(newReview._id);
        await listing.save();
            req.flash("succes","Review added successfully");
        res.redirect(`/listings/${id}`);
    })
);

//! Review Delete

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        req.flash("succes","review deleted successfully");
    res.redirect(`/listings/${id}`);
}));
module.exports = router;