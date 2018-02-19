import axios from 'axios';
import {$} from './bling';

function ajaxCart(e){
    e.preventDefault();
    //console.log('wishlist event triggered');
   console.log(this);
    axios
        .post(this.action)
        .then(res=>{
            const isAdded = this.cartlist.classList.toggle('addedcart');
            $('#cart-total').textContent = res.data.cartlist.length+' item(s)';            //const addedMain = this.addedText.classList.toggle()

            if(isAdded){
                this.cartlist.classList.add('addedcart');
            }
        })
        .catch(console.error);
}

export default ajaxCart;