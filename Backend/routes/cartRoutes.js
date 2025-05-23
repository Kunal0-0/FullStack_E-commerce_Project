const express = require("express");
const router = express.Router();
const customMiddleware = require("./middlewares/customMiddleware");
const {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

router
  .route("/", customMiddleware)
  .post(createCart) // Create Cart
  .get(handleGetAllCarts); // Read All Carts

router
  .route("/:user_id", customMiddleware)
  .get(handleGetCartById) // Read Cart by User ID
  .put(updateCart) // Update Cart by User ID
  .delete(deleteCart); // Delete Cart by User IDss

module.exports = router;
