const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../model/urlschema");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/shorten", authMiddleware, async (req, res) => {
  try {
    let { originalUrl, customSlug } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "URL required" });
    }
    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = "https://" + originalUrl;
    }

    try {
      new URL(originalUrl);
    } catch (err) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const shortId = customSlug || nanoid(8);

    if (customSlug) {
      const exists = await Url.findOne({ shortId });
      if (exists)
        return res.status(409).json({ message: "Slug already taken" });
    }

    const newUrl = await Url.create({ originalUrl, shortId, user: req.userId });

    res
      .status(201)
      .json({ shortLink: `http://localhost:3000/${shortId}`, url: newUrl });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-urls", authMiddleware, async (req, res) => {
  try {
    const urls = await Url.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
