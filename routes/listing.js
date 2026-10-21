let express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
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

module.exports = router;