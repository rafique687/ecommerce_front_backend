// models/Collection.js
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ['manual', 'rule-based'],
    default: 'manual',
  },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // only used in manual
  rules: [
    {
      field: String,        // e.g., 'price', 'tags', 'stock'
      operator: String,     // e.g., 'lt', 'eq', 'includes'
      value: mongoose.Schema.Types.Mixed,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
