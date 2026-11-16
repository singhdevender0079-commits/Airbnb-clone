let express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const Review=require("./review.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});
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

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
     upload.single('listing[image]')
,schemaValidate, 
wrapAsync(listingController.postForNewListing));

router.get("/new", isLoggedIn,listingController.renderNewFrom);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(upload.single('listing[image]'),
 schemaValidate,
 wrapAsync(listingController.putRequest))
.delete(isLoggedIn, wrapAsync(listingController.deleteRoute));



router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;