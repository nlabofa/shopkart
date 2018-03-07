import axios from 'axios';
import {$} from './bling';

function ajaxCart(e){
    e.preventDefault();
    //console.log('wishlist event triggered');
   //console.log(this);
    //console.log(jQuery(this).find("span"));
    axios
        .post(this.action)
        .then(res=>{
            console.log(res.data);
            const isAdded = this.cartlist.classList.toggle('addedcart');
            $('#cart-total').textContent = res.data.cartlist.length+' item(s)';
            if (res.data.added) {
                jQuery(this).find("span")[0].innerHTML = 'Added To Cart';
            } else {
                jQuery(this).find("span")[0].innerHTML = 'Add To Cart';
            }

            if(isAdded){
                this.cartlist.classList.add('addedcart');
            }
        })
        .catch(console.error);
}

export default ajaxCart;