const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

const Search = require("../models/Search");

const { getCache, setCache, deleteCache } = require("../utils/cache");

/*
=================================
SEMANTIC SEARCH
=================================
POST /api/search
*/

const semanticSearch = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400);

    throw new Error("Search query is required");
  }

  const cacheKey = `semantic:${query.toLowerCase()}`;

  /*
      CHECK REDIS CACHE
    */

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Semantic Search");

    return res.json(cached);
  }

  console.log("CACHE MISS -> Semantic Search");

  /*
      SIMPLE SEMANTIC SEARCH
    */

  const keywords = query.toLowerCase().split(" ");

  const regex = new RegExp(keywords.join("|"), "i");

  const products = await Product.find({
    $or: [
      {
        name: regex,
      },

      {
        description: regex,
      },

      {
        category: regex,
      },
    ],
  })

    .limit(10);

  /*
      CACHE SEARCH RESULTS
    */

  await setCache(cacheKey, products, 300);

  /*
      SAVE SEARCH HISTORY
    */

  const existingSearch = await Search.findOne({
    query: query.toLowerCase(),
  });

  if (existingSearch) {
    existingSearch.count += 1;

    await existingSearch.save();
  } else {
    await Search.create({
      query: query.toLowerCase(),
      count: 1,
    });
  }

  /*
      DELETE TRENDING CACHE

      so next request gets
      updated trending searches
    */

  await deleteCache("search:trending");

  res.json(products);
});

/*
=================================
TRENDING SEARCHES
=================================

GET /api/search/trending

*/

const getTrendingSearches = asyncHandler(async (req, res) => {
  const cacheKey = "search:trending";

  /*
      CHECK REDIS
    */

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Trending Searches");

    return res.json(cached);
  }

  console.log("CACHE MISS -> Trending Searches");

  const searches = await Search.find()

    .sort({
      count: -1,
    })

    .limit(10);

  /*
      CACHE TRENDING SEARCHES
    */

  await setCache(
    cacheKey,

    searches,

    300,
  );

  res.json(searches);
});

module.exports = {
  semanticSearch,
  getTrendingSearches,
};
