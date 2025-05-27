const express = require("express")
const router = express.Router()
const customMiddleware = require("./middlewares/customMiddleware");
const { createOrder, getUserOrders, getOrderDetails, updateOrderStatus, deleteOrder } = require("../controllers/order")

// Create a new order
router.post("/", customMiddleware, createOrder);

// Get all orders for a specific user
router.get("/:userId", customMiddleware, getUserOrders);

// Get details of a single order
router.get("/details/:id", customMiddleware, getOrderDetails);


router
    .route("/:id", customMiddleware)
    .put(updateOrderStatus) // Update order status
    .delete(deleteOrder)
    
module.exports = router;