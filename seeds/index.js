const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect(
  "mongodb+srv://michaeljswain:qmXlCRrWYNibQUwP@cluster0.jj9wseb.mongodb.net/YelpCamp?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const campground = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });
    await campground.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});