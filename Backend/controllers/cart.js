const Cart = require("../models/cart");

async function createCart(req, res, next) {
  const { user_id, products } = req.body;
  if (!user_id || !products) {
    const error = new Error("User ID and products are required");
    error.statusCode = 400;
    return next(error);
  }
  const cart = new Cart({ user_id, products });
  await cart.save();
  res.status(201).json({ message: "Cart created", cart });
}

async function handleGetAllCarts(req, res) {
  const carts = await Cart.find().populate("user_id").populate("products");
  res.status(200).json(carts);
}

async function handleGetCartById(req, res, next) {
  const cart = await Cart.findOne({ user_id: req.params.user_id }).populate(
    "products"
  );
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(cart);
}

async function updateCart(req, res, next) {
  const updatedCart = await Cart.findOneAndUpdate(
    { user_id: req.params.user_id },
    { products: req.body.products },
    { new: true }
  );
  if (!updatedCart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(updatedCart);
}

async function deleteCart(req, res, next) {
  const deletedCart = await Cart.findOneAndDelete({
    user_id: req.params.user_id,
  });
  if (!deletedCart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: "Cart deleted" });
}

module.exports = {
  createCart,
  handleGetAllCarts,
  handleGetCartById,
  updateCart,
  deleteCart,
};
