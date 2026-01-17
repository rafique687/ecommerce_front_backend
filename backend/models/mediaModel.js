const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'  // ✅ Reference to Product model
  },
    mediaType: {
        type: String,
        enum: ['image', 'video', '3D'],
        required: true,
    },
    filePath: {
    type: [String],  // <-- change here to array of strings
     },
}, {
    timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);
