// ?q=football&from=2023-03-18&sortBy=publishedAt&apiKey=
const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();
const baseURL = process.env.NEWS_BASE_URL;
router.get("/", async (req, res) => {
  try {
    let search = req.url.split("?")[1] || "";
    const defaultSearch = `q=${
      search ? search + " football" : "manchester united"
    }&from=${moment()
      .subtract(1, "month")
      .format("YYYY-MM-DD")}&sortBy=publishedAt&apiKey=${
      process.env.NEWS_API_KEY
    }`;
    const response = await axios.get(`${baseURL}?${defaultSearch}`);
    if (response.data.status === "ok") {
        response.data.articles = response.data.articles.slice(0, 15);
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
