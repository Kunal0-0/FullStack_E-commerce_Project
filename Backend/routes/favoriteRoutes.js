const express = require("express")
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");

const { addToFavorites, removeFromFavorites, getFavorites } = require("../controllers/favorites")
// const { catchAsync } = require("../library/GlobalErrorHandler")

router.post("/", (addToFavorites));
router.get("/:userId", (getFavorites));
router.delete("/:productId", (removeFromFavorites));

module.exports = router;