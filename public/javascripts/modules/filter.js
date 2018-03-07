import axios from 'axios';
import { $ } from './bling';
function filter() {
    console.log('filter started');
    console.log(this.value);
    const endpoint = `/api/stores/${this.value}`;
   axios
       .post(endpoint)
        .then(res => {
            console.log(res);
        })
        .catch(console.error);
}

export default filter;