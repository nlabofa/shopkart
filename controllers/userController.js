const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req,res)=>{
    res.render('login', {title:'Login Form'});
};
exports.registerForm = (req,res)=>{
    res.render('register', {title:'Register Form'});
};

exports.validateRegister = (req,res,next)=>{
    req.sanitizeBody('firstname');
    req.sanitizeBody('lastname');
    req.checkBody('firstname', 'You must supply a firstname').notEmpty();
    req.checkBody('lastname', 'You must supply a lastname').notEmpty();
    req.checkBody('phonenumber', 'The number must be supplied!').notEmpty();
    req.checkBody('email', 'That Email is not Valid!').isEmail();
    //req.checkBody('email').exists();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirm Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your password do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {title:'Register', body: req.body, flashes:req.flash()});
        return;
    }
    next();
};
/* jshint ignore:start */
exports.register = async(req,res,next)=>{
    const user = new User({email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname,phonenumber:req.body.phonenumber});

    const register = promisify(User.register, User);

    await register(user, req.body.password);
    next();
    
};