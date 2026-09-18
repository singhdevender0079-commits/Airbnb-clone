let mongoose=require("mongoose");
let express=require("express");
let app= express();
let path=require("path");
let methodOverride=require("method-override");
const Listings = require("./models/listing.js");
const Listing = require("./models/listing.js");
const ejsMate=require("ejs-mate");
let port=8080;

main()
.then(()=>{
    console.log("cconnected");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}

//! Middlewares
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

//! Routs
app.get("/",(req,res)=>{
    res.send("jai peeran di");
});

app.get("/listings", async(req,res)=>{
let allListings= await Listings.find();
res.render("listings/index.ejs",{allListings});
});

app.get("/listings/new",(req,res)=>{
res.render("listings/new.ejs");
});
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
     const listing= await Listings.findById(id);
    res.render("listings/show.ejs",{listing});
})



app.post("/listings",async(req,res)=>{
let {title,description,image,price,location,country}=req.body;
let sampleListing= await new Listing({
 title:title,
        description:description,
        image:image,
        price:price,
         location:location,
        country:country
       
});

await sampleListing.save();
    console.log("sample was saved");
    redirect("/listings");
});

app.get("/listings/:id/edit",async (req,res)=>{
        let {id}=req.params;
     const listing= await Listings.findById(id);
    res.render("listings/edit.ejs",{listing});
});

app.put("/listing/:id",async (req,res)=>{
let {id}=req.params;
let { title, description, image, price, place, country } = req.body;
let edit= await Listings.findByIdAndUpdate(id,{
     title:title,
        description:description,
        image:image,
        price:price,
        place:place,
        country:country
})
res.redirect("/listings");
});

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deletedListing);
});

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



app.listen(port,()=>{
console.log("app is listening on the port 8080");
});