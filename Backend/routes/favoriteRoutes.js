const express = require("express")
const router = express.Router();

const { addToFavorites, removeFromFavorites, getFavorites } = require("../controllers/favorites")

router.post("/", addToFavorites);
router.get("/:userId", getFavorites);
router.delete("/:productId", removeFromFavorites);

module.exports = router;