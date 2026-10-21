let express = require("express");
const router=express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const Review = require("../models/review.js");
let schemaValidate = (req, res, next) => {
    let result = listingSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}
let reviewValidate = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}
// router.get("/", (req, res) => {
//     res.send("jai peeran di");
// });
router.get("/", wrapAsync(async (req, res) => {
    let allListings = await Listings.find();
    res.render("listings/index.ejs", { allListings });
}));

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));


router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

router.put("/:id", schemaValidate, wrapAsync(async (req, res) => {

    let { id } = req.params;

    await Listings.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
    res.redirect("/listings");
}));




router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listings.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
}));


router.post(
    "/:id/reviews",
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

        res.redirect(`/listings/${id}`);
    })
);

//! Review Delete

router.delete("/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
    let {id , reviewId}=req.params;
await Review.findByIdAndDelete(reviewId);
await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

res.redirect(`/listings/${id}`);
}));

module.exports=router;