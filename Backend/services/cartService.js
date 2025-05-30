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
async function getCartByUserId(userId) {
  return await Cart.findOne({ user_id: userId }).populate("products").populate(products.product_id);
}

// Update cart for a specific user
async function updateCartByUserId(userId, products) {
  return await Cart.findOneAndUpdate(
    { user_id: userId },
    { products },
    { new: true }
  ).populate("user_id").populate("products.product_id")
}

// Delete cart for a specific user
async function deleteCartByUserId(userId) {
  return await Cart.findOneAndDelete({ user_id: userId });
}

module.exports = {
  createNewCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
};
