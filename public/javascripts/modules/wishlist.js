import axios from 'axios';
import {$} from './bling';

function ajaxWish(e){
    e.preventDefault();
    //console.log('wishlist event triggered');
   console.log(this);
    axios
        .post(this.action)
        .then(res=>{
            const isAdded = this.wishlist.classList.toggle('wishearted');
            $('.wishlist-count').textContent = res.data.wishlist.length;
            //console.log(res.data.wishlist.length);

            if(isAdded){
                this.wishlist.classList.add('wishearted');
            }
        })
        .catch(console.error);
}

export default ajaxWish;