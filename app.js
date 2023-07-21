const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");

mongoose.connect(
  "mongodb+srv://michaeljswain:qmXlCRrWYNibQUwP@cluster0.jj9wseb.mongodb.net/YelpCamp?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
