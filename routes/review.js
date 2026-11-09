let express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
let reviewValidate = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}
router.post("/",isLoggedIn,
    reviewValidate,
    wrapAsync(async (req, res) => {
        const { id } = req.params;
         const listing = await Listings.findById(id);
        const newReview = new Review(req.body.review);
        newReview.createdBy=req.user._id;
        await newReview.save();
        listing.reviews.push(newReview._id);
        await listing.save();
        req.flash("succes", "Review added successfully");
        res.redirect(`/listings/${id}`);
    })
);

//! Review Delete

router.delete("/:reviewId",isLoggedIn, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

        const listing = await Listings.findById(id);
const review=await Review.findById(reviewId);
        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }
        if(!review.createdBy.equals(req.user._id)){
            req.flash("error","You don't have access to delete this review ");
          return  res.redirect("/listings");
        }
    await Review.findByIdAndDelete(reviewId);
    await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("succes", "review deleted successfully");
    return res.redirect(`/listings/${id}`);
}));
module.exports = router;