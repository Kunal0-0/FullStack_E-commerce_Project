const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const { catchAsync } = require("../library/GlobalErrorHandler")

router
  .route("/")
  .post(catchAsync(createCart)) // Create Cart
  .get(catchAsync(handleGetAllCarts)); // Read All Carts

router
  .route("/:user_id")
  .get(catchAsync(handleGetCartById)) // Read Cart by User ID
  .put(catchAsync(updateCart)) // Update Cart by User ID
  .delete(catchAsync(deleteCart)); // Delete Cart by User IDss

module.exports = router;
