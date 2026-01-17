const mongoose = require('mongoose');
const DiscountSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',      
    required: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  conditions: {
    min_qty: { type: Number, default: 1 },
    user_role: { type: String, default: 'any' }
  }
});

module.exports = mongoose.model('Discount', DiscountSchema);
