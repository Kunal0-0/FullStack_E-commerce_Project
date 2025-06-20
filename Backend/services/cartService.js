const Cart = require("../models/cart");

// Create a new cart
async function createNewCart(data) {
  const cart = new Cart(data);
  return await cart.save();
}

// Get all carts
async function getAllCarts() {
  return await Cart.find().populate("user_id").populate("products.produt_id");
}

// Get a cart by user ID
async function getCartByUserId({ userId }) {
  return await Cart.findOne({ user_id: userId })
    .populate("user_id")
    .populate("products.product_id");
}

// Update cart for a specific user
async function updateCartByUserId(userId, products) {
  console.log("PUT /cart/:userId", userId);
  // const cart = await Cart.findOne({ user_id: userId });
  const cart = await Cart.findOneAndUpdate(
    { user_id: userId },
    { products: products },
    { new: true }
  )
    .populate("user_id")
    .populate("products.product_id");
  console.log("Cart found:", cart);
  return await cart.save();
}

// Delete cart for a specific user
async function deleteCartByUserId(userId) {
  return await Cart.findOneAndDelete({ user_id: mongoose.Types.ObjectId(userId) });
}

module.exports = {
  createNewCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
};
