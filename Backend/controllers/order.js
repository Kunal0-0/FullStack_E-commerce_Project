const Order = require("../models/order");

// create a new order
async function createOrder(req, res, next) {
  const { userId, items, address, paymentStatus,
    orderStatus,paymentMethod } = req.body;

  if (!userId || !items || !address || !paymentMethod) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = new Order({
    userId,
    items,
    address,
    paymentStatus,
    orderStatus,
    paymentMethod,
  });

  await order.save();
  res.status(201).json({ message: "Order placed successfully", order, totalAmount });
}

// get all orders for a user
async function getUserOrders(req, res, next) {
  const { userId } = req.params;
  const orders = await Order.find({ userId }).populate("items.productId");

  res.status(200).json(orders);
}

// get details of a specific order
async function getOrderDetails(req, res, next) {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("items.productId")
    .populate("address");

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json(order);
}

// Update order status
async function updateOrderStatus(req, res, next) {
  const { id } = req.params;
  const { items, orderStatus, paymentStatus } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { items, orderStatus, paymentStatus },
    { new: true }
  );

  if (!updatedOrder) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ message: "Order updated successfully", updatedOrder });
}

// Delete an order
async function deleteOrder(req, res, next) {
  const{ id } = req.params;
  const deletedOrder = await Order.findByIdAndDelete(id);

  if(!deletedOrder) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ message: "Order deleted successfully" });
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
};
