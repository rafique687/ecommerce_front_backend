const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username:{
    type:String,
    required:true,
    
  },
  password: {
    type: String,
    required: true,   // default value is 1
  },
}, { timestamps: true });

module.exports = mongoose.model('users', categorySchema);
