let mongoose = require("mongoose");
let express = require("express");
let app = express();
let path = require("path");
let methodOverride = require("method-override");
const Listings = require("./models/listing.js");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
let port = 8080;

main()
    .then(() => {
        console.log("cconnected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}

//! Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);



//! Routs
app.get("/", (req, res) => {
    res.send("jai peeran di");
});

app.get("/listings", wrapAsync(async (req, res) => {
    let allListings = await Listings.find();
    res.render("listings/index.ejs", { allListings });
}));

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/show.ejs", { listing });
}));

let schemaValidate = (req, res, next) => {
    let result = listingSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}

app.post("/listings", schemaValidate, wrapAsync(async (req, res) => {
    // let {title,description,image,price,place,country}=req.body;
    // if(! req.body.listing){
    // throw new ExpressError(400,"Enter valid data");
    // }
    let newListing = new Listing(req.body.listing);
    //  title:title,
    //         description:description,
    //         image:image,
    //         price:price,
    //          place:place,
    //         country:country

    // });
    // if(!newListing.title){
    //     throw new ExpressError(404,"title is required");
    // }
    // if(!newListing.description){
    //     throw new ExpressError(404,"description is required");
    // }
    // if(!newListing.image){
    //     throw new ExpressError(404,"image is required");
    // }
    // if(!newListing.location){
    //     throw new ExpressError(404,"place is required");
    // }

    // if(!newListing.price){
    //     throw new ExpressError(404,"price is required");
    // }
    // if(!newListing.country){
    //     throw new ExpressError(404,"country is required");
    // }
    await newListing.save();
    console.log("sample was saved");
    res.redirect("/listings");

}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

app.put("/listings/:id", schemaValidate, wrapAsync(async (req, res) => {

    let { id } = req.params;

    await Listings.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
    res.redirect("/listings");
}));
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
}));

// app.get("/testListing", async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:50000,
//         location:"Calangute , Goa",
//         country:"India"
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send(" test succesfull");                                                                              
// });





app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "This page does'nt exist"));
});

app.use((err, req, res, next) => {
    let { statuscode = 400, message = "Something went wrong!" } = err;
    res.status(statuscode).render("listings/error.ejs", { message });
});
app.listen(port, () => {
     console.log(`Server listening at http://localhost:${port}/listings/`);
});