const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
