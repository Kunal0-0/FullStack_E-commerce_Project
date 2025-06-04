const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
// const { catchAsync } = require("../library/GlobalErrorHandler")

router
  .route("/")
  .post(verifyToken, createCart) // Create Cart
  .get(handleGetAllCarts); // Read All Carts

router
  .route("/:user_id")
  .get(handleGetCartById) // Read Cart by User ID
  .put(updateCart) // Update Cart by User ID
  .delete(deleteCart); // Delete Cart by User IDss

module.exports = router;
