const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');



router.get('/', catchErrors(productController.homePage));
router.get('/register', userController.registerForm);
router.post('/register', 
    userController.validateRegister,
    userController.register,
    authController.login
);
router.get('/logout', authController.logout);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.post('/create', catchErrors(productController.createProduct));
router.get('/:slug', catchErrors(productController.getProductBySlug));
router.get('/product/:catid', catchErrors(productController.getProductByCategory));
router.post('/api/stores/:id/wishes', catchErrors(productController.addWishList));
router.post('/api/stores/:id/carts', catchErrors(productController.addToCart));


module.exports = router;