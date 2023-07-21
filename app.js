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
// INDEX
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});
// NEW
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
// SHOW
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});
// CREATE
app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
