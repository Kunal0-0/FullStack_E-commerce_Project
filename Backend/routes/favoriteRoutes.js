const express = require("express")
const router = express.Router();
const customMiddleware = require("./middlewares/customMiddleware");

const { addToFavorites, removeFromFavorites, getFavorites } = require("../controllers/favorites")

router.post("/", customMiddleware, addToFavorites);
router.get("/:userId", customMiddleware, getFavorites);
router.delete("/:productId", customMiddleware, removeFromFavorites);

module.exports = router;