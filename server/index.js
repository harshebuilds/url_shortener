require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const urlRoutes = require("./routes/urls");
const Url = require("./model/urlschema");

connectDB(); // try catch in db.js so no need here

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", urlRoutes);

app.get("/:shortId", async (req, res) => {
  try {
    const origUrl = await Url.findOne({ shortId: req.params.shortId });
    if (!origUrl) {
      return res.status(404).json({ message: "Not found" });
    }

    Url.updateOne({ _id: origUrl._id }, { $inc: { clicks: 1 } }).exec();
    res.redirect(301, origUrl.originalUrl);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
