// ?q=football&from=2023-03-18&sortBy=publishedAt&apiKey=
const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();
const baseURL = process.env.NEWS_BASE_URL;
const News = require("./news.model");

router.get("/", async (req, res) => {
  try {
    let search = req.url.split("?")[1] || "";
    const defaultSearch = `q=${
      search ? search + " football" : "manchester united"
    }&from=${moment()
      .subtract(1, "month")
      .format("YYYY-MM-DD")}&sortBy=publishedAt&language=en&apiKey=${
      process.env.NEWS_API_KEY
    }`;
    const news = await News.find({});
    const response = await axios.get(`${baseURL}?${defaultSearch}`);
    if (response.data.status === "ok") {
      response.data.articles = [
        ...news,
        ...response.data.articles.slice(0, 15),
      ];
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).send(news);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single news article by ID
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const news = await News.findById(_id);
    if (!news) {
      return res.status(404).send();
    }
    res.send(news);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a news article by ID
router.put("/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body);
    if (!news) {
      return res.status(404).send();
    }
    await news.save();
    res.send(news);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a news article by ID
router.delete("/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).send();
    }
    res.send(news);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
