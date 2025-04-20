const Product = require("../models/product");

async function createProduct(req, res, next) {
  const { name, price } = req.body;
  if (!name || !price) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  const product = new Product({ name, price });
  await product.save();
  res.status(201).json({ message: "Product created", product });
}

async function handleGetAllProducts(req, res) {
  const products = await Product.find();
  res.status(200).json(products);
}

async function handleGetProductsById(req, res, next) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(product);
}

async function updateProduct(req, res, next) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedProduct) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(updatedProduct);
}

async function deleteProduct(req, res, next) {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: "Product deleted" });
}

module.exports = {
  createProduct,
  handleGetAllProducts,
  handleGetProductsById,
  updateProduct,
  deleteProduct,
};
