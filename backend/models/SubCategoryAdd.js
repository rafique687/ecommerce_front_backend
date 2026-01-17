const mongoose = require('mongoose');
const subcategorySchema = new mongoose.Schema({
    categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
   
  },
  subcategory: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Number,
    default: 1,   // default value is 1
  },
}, { timestamps: true });



module.exports = mongoose.model('Subcategory', subcategorySchema);




