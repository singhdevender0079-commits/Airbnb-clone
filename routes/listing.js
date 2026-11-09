let express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const Review=require("./review.js");
const listingController=require("../controllers/listings.js");
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
router.get("/",wrapAsync(listingController.index));

router.get("/new", isLoggedIn,listingController.renderNewFrom);

router.get("/:id", wrapAsync(listingController.showListing));

router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.renderEditForm));

router.put("/:id", schemaValidate, wrapAsync(listingController.putRequest));
router.post("/", schemaValidate, wrapAsync(listingController.postForNewListing));

router.delete("/:id",isLoggedIn, wrapAsync(listingController.deleteRoute));

module.exports = router;