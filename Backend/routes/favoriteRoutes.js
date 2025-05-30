const express = require("express")
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");

const { addToFavorites, removeFromFavorites, getFavorites } = require("../controllers/favorites")
const { catchAsync } = require("../library/GlobalErrorHandler")

router.post("/", catchAsync(addToFavorites));
router.get("/:userId", catchAsync(getFavorites));
router.delete("/:productId", catchAsync(removeFromFavorites));

module.exports = router;