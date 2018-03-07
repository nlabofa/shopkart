const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const faker = require('faker');
const User = mongoose.model('User');
/* jshint ignore:start */
exports.homePage = async(req, res) => {
    
    const featuredproducts = Product.find({featured: true}).sort({created:'desc'}).limit(4);
    const latestproducts =  Product.find().sort({created:'asc'}).limit(6);
        
    const [featured, latest] = await Promise.all([featuredproducts,latestproducts]);
    //res.json(featured);
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
        [operator]: {cartlist: req.params.id,added:'Added'}
    }, {new:true});
    res.json(user);
};
exports.getProductBySlug = async(req,res,next)=>{
    const productPromise = Product.findOne({
        slug: req.params.slug
    }).populate('related');
    const categoriesPromise = Product.getCategoryList();
    if (!productPromise) return next();
    const [product, categorysidebar] = await Promise.all([productPromise,categoriesPromise]);
    //console.log(test);
    //res.json(product);
    res.render('product', {product , categorysidebar, title: product.name})
};
exports.getProductByCategory = async(req,res)=>{

    const page = req.params.page || 1;
    const limit = 1;
    const skip = (page * limit) - limit

    const category = req.params.catid;
    const categoryDetailPromise = Product.find({ categories: category }).skip(skip).limit(limit).sort({created:'asc'});
    const categoriesPromise = Product.getCategoryList();

    const categoryDetail = Product.find({ categories: category });
    const countPromise = categoryDetail.count();

    const [categorydetail, categorysidebar,count] = await Promise.all([categoryDetailPromise, categoriesPromise, countPromise]);

    const pages = Math.ceil(count / limit);//math .ceil will give us the upper bound number
    if (!categorydetail.length && skip) {
        req.flash('info', `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
        res.redirect(`/product/${category}/${pages}`);
        return;
    }
   

    res.render('categories', {categorydetail,categorysidebar,category,count,page,pages,title:`${category}-category`});
   //res.json(categorydetail)
};
exports.filter = async (req, res) => {
    const filtervalue= req.params.val;
    if(filtervalue = 'latest'){
        const result = await Product.find().sort({ created: 'desc' });
        res.json(result)
    }
    //res.json(result);
   // console.log(result)
};