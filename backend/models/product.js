const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categoryid: {
    type: String,
    required: true,
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,   // Change from String to ObjectId
    ref: 'Subcategory',                      // Reference your Subcategory model name here
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  product_size: {
    type: String,
    required: true,  
  },
  product_color: {
    type: String,
    required: true,  
  },
   product_stock: {
    type: Number,
    required: true,  
  },
    tieredPricing: [        
    {
      minQty: Number,      // Minimum quantity for this tier
      maxQty: Number,      // Optional max quantity (could be null or undefined)
      price: Number        // Unit price for this tier
    }
  ],
  price: {
    type: Number,
    required: true,
  },
    meta_Title: {
    type: String,
    
  },
    meta_Description: {
    type: String,
    
  },
    url_Slug: {
    type: String,
     
  },
  status: {
  type: String,
  enum: ['draft', 'active', 'archived'],
  default: 'draft'
},
}, { timestamps: true });

//module.exports = mongoose.model('product', productSchema);
module.exports = mongoose.model('Product', productSchema);
