const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'refunded'],
        default: "Pending"
    },

    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: "Processing"
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ['Card', 'UPI', 'NetBanking', 'COD'],
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)