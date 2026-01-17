const mongoose = require('mongoose');
const usercreddbSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        trim : true
    },
    email: {
        type:String,
        require:true,
        trim : true,
    },
    password : {
        type : String,
        require: true,
        trim: true
    }
});
module.exports = mongoose.model('usercreddb', usercreddbSchema);
