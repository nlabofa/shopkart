const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: 'Please enter a product name'
    },
    slug: String,
    description:{
        type:String,
        trim:true
    },
    categories: [String], //Array of Strings
    created:{
        type: Date,
        default: Date.now
    },
    price: Number,
    photo: String,
    featured:Boolean,
    related: [
        { type: mongoose.Schema.ObjectId, ref: 'Product' }
    ]
},
{ //this makes the virtuals visible when we dump them on the page
        toJSON: { virtuals: true },
        toOjbect: { virtuals: true },
});
/* jshint ignore:start */
productSchema.pre('save', async function(next){
    if(!this.isModified('name')){
        next();
        return;
    }
    this.slug = slug(this.name);

    // check if there are any other slug with same name. we want to make them unique before saving
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i'); //case insensitive(i).starts with slug name(this.slug) and ends with one of two things 0-9 -1/-2/-3 which are optional
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx }); //we use this.constructor to access a model inside the model instead of(store.find)
    if (storesWithSlug.length) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
});
productSchema.statics.getCategoryList = function(){
    return this.aggregate([
        {$unwind: '$categories'},
        {$group: {_id: '$categories', count:{$sum: 1}}},
        {$sort: {count:-1}}
    ]);
}

module.exports = mongoose.model('Product', productSchema);