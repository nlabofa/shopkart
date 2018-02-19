import '../css/sass/style.scss';


import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";
import ajaxWish from './modules/wishlist';
import ajaxCart from './modules/addtocart';
const wishForms = $$('form.wish');
const cartForms = $$('form.addcart');

cartForms.on('submit', ajaxCart);
wishForms.on('submit', ajaxWish);