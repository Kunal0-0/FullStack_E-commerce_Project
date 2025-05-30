const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
        default: 1
      },
      _id: {type: mongoose.Schema.Types.ObjectId}
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
