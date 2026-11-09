const Review = require("../models/review.js");

module.exports.postReview=async (req, res) => {
        const { id } = req.params;
         const listing = await Listings.findById(id);
        const newReview = new Review(req.body.review);
        newReview.createdBy=req.user._id;
        console.log("Logged in User:", req.user);
console.log("Created By:", newReview.createdBy);

        await newReview.save();
        listing.reviews.push(newReview._id);
        await listing.save();
        req.flash("succes", "Review added successfully");
        res.redirect(`/listings/${id}`);
    };

    module.exports.deleteReview=async (req, res) => {
        let { id, reviewId } = req.params;
    
            const listing = await Listings.findById(id);
    const review=await Review.findById(reviewId);
            if (!review) {
                throw new ExpressError(404, "Listing not found");
            }
    
    if (!review.createdBy) {
        req.flash("error", "This review has no creator information");
        return res.redirect(`/listings/${id}`);
    }
            if(!review.createdBy.equals(req.user._id)){
                req.flash("error","You don't have access to delete this review ");
              return  res.redirect("/listings");
            }
        await Review.findByIdAndDelete(reviewId);
        await Listings.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        req.flash("succes", "review deleted successfully");
        return res.redirect(`/listings/${id}`);
    };