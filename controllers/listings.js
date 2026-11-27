let mapToken=process.env.MAP_KEY;

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


const Listings = require("../models/listing");
module.exports.index = async (req, res) => {
    let allListings = await Listings.find();
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewFrom = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
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

    if (!listing) {
        req.flash("error", "Listing doesn't exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing) {
        req.flash("error", "Listing doesn't exist");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "you don't have permission edit");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};
module.exports.putRequest = async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "you don't have permission to  edit this listing");
        res.redirect("/listings");
    }
  let updatedListing=  await Listings.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
    let filename = req.file.filename;
updatedListing.image={url,filename};
 await updatedListing.save();
    }
    req.flash("succes", "Listing updated successfully");
    res.redirect("/listings");
};

//!  Maps geocoding
module.exports.postForNewListing = async (req, res) => {
    let response=await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();
// console.log(` Longitude - ${response.body.features[0].geometry.coordinates[0]}`);
// console.log(` Latitude - ${response.body.features[0].geometry.coordinates[1]}`);
// res.send("done!");
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listings(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
newListing.geometry=response.body.features[0].geometry;
 let data=   await newListing.save();

 console.log(data);
    req.flash("succes", "new listing created successfully");

    res.redirect("/listings");
};
module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listings.findById(id);
    if (!deletedListing) {
        req.flash("error", "Listing does'not exist");
        return res.redirect("/listings");
    }
    if (!deletedListing.owner.equals(req.user._id)) {
        req.flash("error", "You don,t have permission to delete this listing");
        return res.redirect("/listings");
    }
    await Listings.findByIdAndDelete(id);
    req.flash("succes", "Listing deleted successfully");
    return res.redirect("/listings");
};
module.exports.Searching = async (req, res) => {
    let { search } = req.body;
    let allListings = await Listings.find({
          $or: [
                   { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
              { country: { $regex: search, $options: "i" } }
        ]
    });
     if (allListings.length === 0) {
        req.flash("error", "Listing doesn't exist");
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings });
};