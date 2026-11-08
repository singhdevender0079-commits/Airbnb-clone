
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
    console.log("Connected to MongoDB");
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6ae73f4fc7a1315e411395bd",
    }));
console.log(initData.data[0]);
    await Listing.insertMany(initData.data);
    const listings = await Listing.find({});
console.log(listings[0]);
    console.log("Data initialized");
};

async function start() {
    try {
        await main();
        await initDB();
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
}

start();
