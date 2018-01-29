/* Boostrap App */
import './bootstrap'
/* App Routing */
import router from './router'
/* App Template */
import App from './App.vue'
/* App State Management */
import store from './store'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
/* Add Vuex Router Module */
sync(store, router)

Vue.use(Vuetify, {
    theme: {
        primary: '#BA9A5A',
        secondary: '#455A64',
        accent: '#103050',
        error: '#C62828',
        info: '#7FCAC3',
        success: '#D4E157',
        warning: '#FFEA00'
    }
})
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
