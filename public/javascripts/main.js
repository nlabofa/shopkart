import '../css/sass/style.scss';


import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";
import ajaxWish from './modules/wishlist';
import ajaxCart from './modules/addtocart';
import filter from './modules/filter';
const wishForms = $$('form.wish');
const cartForms = $$('form.addcart');
const filterform = $$('select');

cartForms.on('submit', ajaxCart);
wishForms.on('submit', ajaxWish);
filterform.on('change', filter);