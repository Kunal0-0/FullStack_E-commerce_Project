const express = require("express");
const router = express.Router();
const {
  createProduct,
  handleGetAllProducts,
  handleGetProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router
  .route("/")
  .post(createProduct) // Create Product
  .get(handleGetAllProducts); // Read All Products

router
  .route("/:id")
  .get(handleGetProductsById) // Read Product by ID
  .put(updateProduct) // Update Product by ID
  .delete(deleteProduct); // Delete Product by ID

module.exports = router;
