const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const faker = require('faker');
const User = mongoose.model('User');
/* jshint ignore:start */
exports.homePage = async(req, res) => {
    
    const featuredproducts = Product.find({featured: true}).sort({created:'desc'}).limit(4);
    const latestproducts =  Product.find().sort({created:'asc'}).limit(6);
        
    const [featured, latest] = await Promise.all([featuredproducts,latestproducts]);
    res.render('index',{title:'Home',featured,latest});
};

exports.createProduct = async(req,res) => {
    const product ={
        name: faker.commerce.productName(),
        description: faker.lorem.words(11),
        categories: faker.commerce.department(),
        price: faker.random.number(1000),
        photo: faker.image.fashion(),
        featured:false

    }
    const store = await(new Product(product)).save();
    res.send({status:200, message:'Suceesfully created'});
};
exports.addWishList = async(req,res)=>{
    const wishes = req.user.wishlist.map(obj => obj.toString());
    const operator = wishes.includes(req.params.id)? '$pull': '$addToSet';
    const user = await User
    .findByIdAndUpdate(req.user._id, {
        [operator]: {wishlist: req.params.id}
    }, {new:true});
    res.json(user);
};
exports.addToCart = async(req,res)=> {
    const productincart = req.user.cartlist.map(obj=> obj.toString());
    const operator = productincart.includes(req.params.id) ? '$pull': '$addToSet';
    const user = await User
    .findByIdAndUpdate(req.user.id, {
        [operator]: {cartlist: req.params.id}
    }, {new:true});
    res.json(user);
};
exports.getProductBySlug = async(req,res,next)=>{
    const productPromise = Product.findOne({
        slug: req.params.slug
    });
    const categoriesPromise = Product.getCategoryList();
    if (!productPromise) return next();
    const [product, categorysidebar] = await Promise.all([productPromise,categoriesPromise]);
    //console.log(categories);
    res.render('product', {product , categorysidebar, title: product.name})
};
exports.getProductByCategory = async(req,res)=>{

    const category = req.params.catid;
    const categoriesPromise = Product.getCategoryList();
    const categoryDetailPromise = Product.find({ categories: category });

    const [categorydetail, categorysidebar] = await Promise.all([categoryDetailPromise, categoriesPromise]);
   res.render('categories', {categorydetail,categorysidebar,category ,title:`${category}-category`});
};