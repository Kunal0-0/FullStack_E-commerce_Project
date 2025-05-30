const {
  createOrderService,
  getUserOrdersService,
  getOrderDetailsService,
  updateOrderStatusService,
  deleteOrderService,
} = require("../services/orderService");

// create a new order
async function createOrder(req, res, next) {
  const { userId, items, address, paymentStatus, orderStatus, paymentMethod } =
    req.body;

  // Validate required fields to avoid processing incomplete data
  if (!userId || !items || !address || !paymentMethod) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  // Call service to create a new order and calculate total amount
  const { order, totalAmount } = await createOrderService({
    userId,
    items,
    address,
    paymentStatus,
    orderStatus,
    paymentMethod,
  });

  // Respond with success message and created order details
  res
    .status(201)
    .json({ message: "Order placed successfully", order, totalAmount });
}

// get all orders for a user
async function getUserOrders(req, res, next) {
  // Fetch all orders associated with a specific user ID
  const orders = await getUserOrdersService(req.params.userId);

  // Return list of orders even if empty
  res.status(200).json(orders);
}

// get details of a specific order
async function getOrderDetails(req, res, next) {
  // Fetch order by its unique ID
  const order = await getOrderDetailsService(req.params.id);

  // Handle case where order doesn't exist
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  // Respond with the found order details
  res.status(200).json(order);
}

// Update order status
async function updateOrderStatus(req, res, next) {
  // Update order using ID and new status info from request body
  const updatedOrder = await updateOrderStatusService(req.params.id, req.body);

  // Return error if the order to be updated doesn't exist
  if (!updatedOrder) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  // Confirm successful update to client
  res.status(200).json({ message: "Order updated successfully", updatedOrder });
}

// Delete an order
async function deleteOrder(req, res, next) {
  // Remove order by ID
  const deletedOrder = await deleteOrderService(req.params.id);

  // Handle case where the order to delete doesn't exist
  if (!deletedOrder) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  // Confirm deletion
  res.status(200).json({ message: "Order deleted successfully" });
}

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
};
