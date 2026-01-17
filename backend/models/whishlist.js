const mongoose = require('mongoose');
const { create } = require('./addcategory');
const whishlistSchema = new mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Usercreddb',
        require:true
    },
    productid:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Product',
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
      });
      module.exports = mongoose.model('Whishlist',whishlistSchema); 