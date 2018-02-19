const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const relatedProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: 'Please chhose a related product'
    },
    created:{
        type: Date,
        default: Date.now
    },
    relatedId: [
        { type: mongoose.Schema.ObjectId, ref: 'Product' }
    ]
});
module.exports = mongoose.model('RelatedProduct', relatedProductSchema);