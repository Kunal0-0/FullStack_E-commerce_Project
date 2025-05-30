const express = require("express");
const router = express.Router();
// const customMiddleware = require("./middlewares/customMiddleware");
const {
  createProduct,
  handleGetAllProducts,
  handleGetProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { catchAsync } = require("../library/GlobalErrorHandler")

router
  .route("/")
  .post(catchAsync(createProduct)) // Create Product
  .get(catchAsync(handleGetAllProducts)); // Read All Products

router
  .route("/:id")
  .get(catchAsync(handleGetProductsById)) // Read Product by ID
  .put(catchAsync(updateProduct)) // Update Product by ID
  .delete(catchAsync(deleteProduct)); // Delete Product by ID

module.exports = router;
