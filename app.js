let mongoose = require("mongoose");
let express = require("express");
let app = express();
let path = require("path");
let methodOverride = require("method-override");
const Listings = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews =require("./routes/review.js");
let port = 8080;
main()
    .then(() => {
        console.log("connected");
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

let reviewValidate = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(404, result.error);
    }
    else {
        next();
    }
}

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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






// app.get("/testListing", async (req,res)=>{
//     let sampleListing=new Listings({
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




// app.post("/listings", schemaValidate, wrapAsync(async (req, res) => {
//     // let {title,description,image,price,place,country}=req.body;
//     // if(! req.body.listing){
//     // throw new ExpressError(400,"Enter valid data");
//     // }
//     let newListing = new Listings(req.body.listing);
//     //  title:title,
//     //         description:description,
//     //         image:image,
//     //         price:price,
//     //          place:place,
//     //         country:country
//     // });
//     // if(!newListing.title){
//     //     throw new ExpressError(404,"title is required");
//     // }
//     // if(!newListing.description){
//     //     throw new ExpressError(404,"description is required");
//     // }
//     // if(!newListing.image){
//     //     throw new ExpressError(404,"image is required");
//     // }
//     // if(!newListing.location){
//     //     throw new ExpressError(404,"place is required");
//     // }

//     // if(!newListing.price){
//     //     throw new ExpressError(404,"price is required");
//     // }
//     // if(!newListing.country){
//     //     throw new ExpressError(404,"country is required");
//     // }
//     await newListing.save();
//     console.log("sample was saved");
//     res.redirect("/listings");

// }));