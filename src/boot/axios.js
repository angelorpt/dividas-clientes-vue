import Vue   from 'vue'
import axios from 'axios'

const url_api = ({ host, pathname }) => {

    // let lstPath = pathname.split('/');
    switch (host) {
        // case 'localhost:8080':
        //     return 'http://localhost:8080/api';

        // case 'localhost:8081':
        //     return 'http://localhost:8081/api';

        default:
            return 'http://divida.epizy.com/api';
    }
}

const Axios = axios.create({
    baseURL: url_api(window.location),
    timeout: 30000,
});

Vue.prototype.$axios = Axios
