const express = require("express");

const router = express.Router();

const {
 clearCache
} = require(
 "../controllers/cacheController"
);

const {
 protect,
 adminOnly
} = require(
 "../middleware/authMiddleware"
);

router.delete(
 "/",
 protect,
 adminOnly,
 clearCache
);

module.exports = router;