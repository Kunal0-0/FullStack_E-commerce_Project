const Order = require("../models/order");

// Create a new order
async function createOrderService({ userId, items, address, paymentStatus, orderStatus, paymentMethod }) {
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

  const savedOrder = await order.save();
  return { order: savedOrder, totalAmount };
}

// Get all orders by userId
async function getUserOrdersService(userId) {
  return await Order.find({ userId }).populate("items.productId");
}

// Get single order details
async function getOrderDetailsService(id) {
  return await Order.findById(id)
    .populate("items.productId")
    .populate("address");
}

// Update order
async function updateOrderStatusService(id, updateData) {
  return await Order.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete order
async function deleteOrderService(id) {
  return await Order.findByIdAndDelete(id);
}

module.exports = {
  createOrderService,
  getUserOrdersService,
  getOrderDetailsService,
  updateOrderStatusService,
  deleteOrderService,
};
