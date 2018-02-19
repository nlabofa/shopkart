const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim:true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please supply an email address'
    },
    firstname:{
        type: String,
        required: 'Please supply your firstname',
        trim: true
    },
    lastname: {
        type: String,
        required: 'Please supply your lastname',
        trim: true
    },
    phonenumber:{
       type:Number,
       min:[11, 'Incorrect length'],
       required:'Please enter phone number' 
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
    wishlist:[
        {type: mongoose.Schema.ObjectId, ref: 'Product'}
    ],
    cartlist:[
        {type: mongoose.Schema.ObjectId, ref:'Product'}
    ]
});
userSchema.virtual('gravatar').get(function(){
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);