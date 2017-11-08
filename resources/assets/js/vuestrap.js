/* IE 11 Compatible */
import Vue from 'vue'
import Vuex from 'vuex' /* State Management */
import Vuetify from 'vuetify' /* Front End Framework */
import Vue2Filters from 'vue2-filters' /* Add Filters such as currency etc */
import VueUp from 'vueup' /* Simple Notification */
import VeeValidate from 'vee-validate' /* Form Validation */
// import VueTimeago from 'vue-timeago' /* Human Readable Time */
// import VueAgile from 'vue-agile' /* Carousel */
// import Bars from 'vuebars' /* Chart */
import VueYouTubeEmbed from 'vue-youtube-embed' /* Embed Youtube Video */
import VueClazyLoad from 'vue-clazy-load' /* Lazyload Images */
// import VueImg from 'v-img' /* Image Gallery Directive */
// import Echo from 'laravel-echo' /* Make App Realtime */
// import VueEcho from 'vue-echo' /* Vue Wrapper for laravel echo */
import VueCookie from 'vue-js-cookie'
import VueVisible from 'vue-visible'
import initialData from './mixins/initial-state' /* Our Initial State Provided By Our App */
import './services/acl' /* Add ACL To Our Routes */
import VueTruncate from 'vue-truncate-filter'

if (window.Vue === undefined) {
    window.Vue = Vue
    window.Bus = new Vue()
}

/* Global Form Helpers : AppForm , App.forms */
require('./forms/form-bootstrap')

/* Form Validation Config */
const veeConfig = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true
}

/* Time Ago Config */
// const timeagoConfig = {
//     name: 'timeago',
//     locale: 'en-US',
//     locales: {
//         'en-US': require('vue-timeago/locales/en-US.json')
//     }
// }

/* Install Vue Plugins */

Vue.use(Vuetify)
Vue.use(Vue2Filters)
Vue.use(VueUp) /* used in almost all axios request */
// Vue.use(VueAgile)
// Vue.use(Bars)
Vue.use(VueYouTubeEmbed) /* used in home.vue */
Vue.use(VueClazyLoad) /* used in categories.vue, products.vue, category.vue */
// Vue.use(VueImg)
// Vue.use(VueTimeago, timeagoConfig)
Vue.use(VeeValidate, veeConfig)
Vue.use(Vuex)
Vue.use(VueCookie) /* used in auth.js */
Vue.use(VueVisible)
Vue.use(VueTruncate) /* used in fileUploader.vue
/* Seed Initial State as Mixins */
Vue.mixin(initialData)

/* Custom Filters */
Vue.filter('formatSize', function (size) {
    if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
    } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
    } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB'
    }
    return size.toString() + ' B'
})

/**
 * Only Load Laravel Echo if Socket.io is Present, Can Be Configure in echo.php
 * If Set to Realtime then this Will be Loaded.
 */

// if (typeof io !== 'undefined') {
//     window.Echo = Echo
//     let EchoInstance = new Echo({
//         namespace: 'App\\Events',
//         broadcaster: 'socket.io',
//         host: `${window.location.hostname}:6001`
//     })
//     /* Install VueEcho: this.$echo */
//     Vue.use(VueEcho, EchoInstance)
// }
