/* Boostrap App */
import './bootstrap'
/* App Routing */
import router from './router'
/* App Template */
import App from './App.vue'
/* App State Management */
import store from './store'
import { sync } from 'vuex-router-sync'
/* Add Vuex Router Module */
sync(store, router)

/* Declare Here All Global Components You Want */

/* Our Main Vue Instance */
/* Reference Bus or vm */
const app = window.vm = new Vue({
    store,
    router,
    el: '#app',
    template: '<App/>',
    components: { App }
})
