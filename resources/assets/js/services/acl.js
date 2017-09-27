import Vue from 'vue'
import Acl from 'vue-acl'
import router from '../routes'
/* Define Your Default Permission , Default is guest */
Vue.use(Acl, { router, init: 'guest' })
