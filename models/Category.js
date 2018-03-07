const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: 'Please choose a related product'
    },
    photo: String,
    description: String,
    created:{
        type: Date,
        default: Date.now
    },
    product: [
        { type: mongoose.Schema.ObjectId, ref: 'Product' }
    ]
});
module.exports = mongoose.model('Category', categorySchema);