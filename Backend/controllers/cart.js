const {
  createNewCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
} = require("../services/cartService");

// Create a new cart
async function createCart(req, res, next) {
  const { user_id, products } = req.body;

  // Ensure both user ID and products are provided before proceeding
  if (!user_id || !Array.isArray(products) || products.length === 0) {
    const error = new Error("User ID and an array of products with qty are required");
    error.statusCode = 400;
    return next(error);
  }

  // validate each product
  for(const product of products) {
    if(!product.product_id || typeof product.qty !== "number" || product.qty < 1) {
      const error = new Error("Each product must have a valid product_id and qty >= 1")
      error.statusCode = 400;
      return next(error)
    }
  }

  // Create a new cart in the database with the given user ID and product list
  const cart = await createNewCart({ user_id, products });

  // Respond with 201 Created and the newly created cart
  res.status(201).json({ message: "Cart created", cart });
}

// Get all carts (admin use case)
async function handleGetAllCarts(req, res) {
  // Retrieve all carts from the database
  const carts = await getAllCarts();

  // Return the list of all carts
  res.status(200).json(carts);
}


// Get a single user's cart by user ID
async function handleGetCartById(req, res, next) {
  // Fetch the cart for a specific user
  const cart = await getCartByUserId(req.params.user_id)

  // If no cart exists, return a 404 error
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the found cart to the client
  res.status(200).json(cart);
}


// Update a user's cart
async function updateCart(req, res, next) {
  const { products } = req.body;

  if(!Array.isArray(products) || products.length === 0){
    const error = new Error("An array of products with qty is required to update the cart");
    error.statusCode = 400;
    return next(error);
  }

  for(const product of products) {
    if(!product.product_id || typeof product.qty !== "number" || product.qty < 1) {
      const error = new Error("Each product must have a valid product_id and qty >= 1");
      error.statusCode = 400;
      return next(error);
    }
  }

  // Attempt to update the user's cart with new product list
  const updatedCart = await updateCartByUserId(
    req.params.user_id,
    products,
  );

  // If the update fails (no cart found), respond with a 404 error
  if (!updatedCart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return the updated cart to confirm success
  res.status(200).json(updatedCart);
}

// Delete a user's cart
async function deleteCart(req, res, next) {
  // Delete the cart associated with the specified user ID
  const deletedCart = await deleteCartByUserId(req.params.user_id);

  // If deletion fails (cart doesn't exist), return a 404
  if (!deletedCart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  // Confirm successful deletion
  res.status(200).json({ message: "Cart deleted" });
}

module.exports = {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
};