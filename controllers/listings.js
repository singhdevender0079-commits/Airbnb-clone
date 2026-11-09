const Listings=require("../models/listing");
module.exports.index=async (req, res) => {
    let allListings = await Listings.find();
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewFrom=(req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
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
};

module.exports.renderEditForm=async (req, res) => {
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
};

module.exports.putRequest=async (req, res) => {

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
};


module.exports.postForNewListing=async (req, res) => {
        
    const newListing = new Listings(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("succes","new listing created successfully");

    res.redirect("/listings");
};

module.exports.deleteRoute=async (req, res) => {
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
    
};