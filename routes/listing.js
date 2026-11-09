let express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const Review=require("./review.js");
let schemaValidate = (req, res, next) => {
    let result = listingSchema.validate(req.body);

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
router.get("/",wrapAsync(async (req, res) => {
    let allListings = await Listings.find();
    res.render("listings/index.ejs", { allListings });
}));

router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new.ejs");
});
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
const listing = await Listings.findById(id)
    .populate("owner")
    .populate({
        path: "reviews",
        populate: {
            path: "createdBy"
        }
    });
        console.log(listing.reviews.map(r => ({
        comment: r.comment,
        createdBy: r.createdBy
    })));

    if(!listing){
        req.flash("error","Listing doesn't exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
       if(!listing){
        req.flash("error","Listing doesn't exist");
      return res.redirect("/listings");
    }
if(!listing.owner.equals(req.user._id)){
    req.flash("error","you don't have permission edit");
    return res.redirect("/listings");
}
    res.render("listings/edit.ejs", { listing });
}));

router.put("/:id", schemaValidate, wrapAsync(async (req, res) => {

    let { id } = req.params;
        const listing = await Listings.findById(id);
        if(!listing.owner.equals(req.user._id)){
            req.flash("error","you don't have permission to  edit this listing");
            res.redirect("/listings");
        }
    await Listings.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
     req.flash("succes","Listing updated successfully");
    res.redirect("/listings");
}));
router.post("/", 
    schemaValidate, wrapAsync(async (req, res) => {
        
    const newListing = new Listings(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("succes","new listing created successfully");

    res.redirect("/listings");
}));
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
     let deletedListing =  await Listings.findById(id);
     if(!deletedListing){
        req.flash("error","Listing does'not exist");
       return res.redirect("/listings");
     }
     if(!deletedListing.owner.equals(req.user._id)){
        req.flash("error","You don,t have permission to delete this listing");
       return res.redirect("/listings");
     }
   await Listings.findByIdAndDelete(id);
     req.flash("succes","Listing deleted successfully");
     console.log(deletedListing);
  return  res.redirect("/listings");
    
}));

module.exports = router;