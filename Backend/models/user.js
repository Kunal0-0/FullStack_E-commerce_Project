const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // contact: {
  //   type: String,
  //   required: [true, "Mobile number or email is required"],
  //   unique: true
  // },
  mobile_number: {
    type: String,
    required: [true, "Mobile number is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  // validation_key: {
  //     type: String,
  //     required: [true]
  // },
  token: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
