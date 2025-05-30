// services/productService.js

const Product = require("../models/product");

// Create a new product
async function createProductService(data) {
  const product = new Product(data);
  return await product.save();
}

// Get all products
async function getAllProductsService() {
  return await Product.find();
}

// Get product by ID
async function getProductByIdService(id) {
  return await Product.findById(id);
}

// Update a product
async function updateProductService(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

// Delete a product
async function deleteProductService(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
