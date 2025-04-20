const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: 'India',
  },
  postalCode: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);