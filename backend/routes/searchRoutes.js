const express = require("express");

const router = express.Router();

const {
  semanticSearch,
  getTrendingSearches,
} = require("../controllers/searchController");

router.post("/", semanticSearch);

router.get("/trending", getTrendingSearches);

module.exports = router;
