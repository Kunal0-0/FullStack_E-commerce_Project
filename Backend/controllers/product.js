const {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require("../services/productService");


// Controller to create a new product
async function createProduct(req, res, next) {
  const { name, price } = req.body;

   // Validate input to ensure required fields are provided
  if (!name || !price) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  const product = await createProductService({ name, price });

  // Return success response with the created product
  res.status(201).json({ message: "Product created", product });
}

// Controller to get all products
async function handleGetAllProducts(req, res) {
  // Fetch all products using service layer
  const products = await getAllProductsService();
  // Return list of products
  res.status(200).json(products);
}

// Controller to get product by ID
async function handleGetProductsById(req, res, next) {
  // Extract ID from request params and fetch product
  const product = await getProductByIdService(req.params.id);

  // Handle case where no product is found for given ID
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the fetched product
  res.status(200).json(product);
}

// Controller to update product by ID
async function updateProduct(req, res, next) {
  // Pass updated data and ID to service for modification
  const updatedProduct = await updateProductService(
    req.params.id,
    req.body
  );

  // Handle case where product to update does not exist
  if (!updatedProduct) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the updated product
  res.status(200).json(updatedProduct);
}

// Controller to delete product by ID
async function deleteProduct(req, res, next) {
  // Attempt deletion via service
  const deletedProduct = await deleteProductService(req.params.id);
  // Handle non-existent product deletion attempts
  if (!deletedProduct) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
  // Confirm deletion
  res.status(200).json({ message: "Product deleted" });
}

module.exports = {
  createProduct,
  handleGetAllProducts,
  handleGetProductsById,
  updateProduct,
  deleteProduct,
};
