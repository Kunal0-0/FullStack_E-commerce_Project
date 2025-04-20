const express = require("express");
const router = express.Router();
const {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

router
  .route("/")
  .post(createCart) // Create Cart
  .get(handleGetAllCarts); // Read All Carts

router
  .route("/:user_id")
  .get(handleGetCartById) // Read Cart by User ID
  .put(updateCart) // Update Cart by User ID
  .delete(deleteCart); // Delete Cart by User IDss

module.exports = router;
