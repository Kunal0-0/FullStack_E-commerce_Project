const express = require("express")
const router = express.Router()
// const customMiddleware = require("./middlewares/customMiddleware");
const { createOrder, getUserOrders, getOrderDetails, updateOrderStatus, deleteOrder } = require("../controllers/order")
const { catchAsync } = require("../library/GlobalErrorHandler")

// Create a new order
router.post("/", catchAsync(createOrder));

// Get all orders for a specific user
router.get("/:userId", catchAsync(getUserOrders));

// Get details of a single order
router.get("/details/:id", catchAsync(getOrderDetails));


router
    .route("/:id")
    .put(updateOrderStatus) // Update order status
    .delete(deleteOrder)
    
module.exports = router;