/* IE 11 Compatible */
import Vue from 'vue'
import Vuex from 'vuex' /* State Management */
import Vuetify from 'vuetify' /* Front End Framework */
import VueDefaultValue from 'vue-default-value' /* add default directive */
import Vue2Filters from 'vue2-filters' /* Add Filters such as currency etc */
import VueUp from 'vueup' /* Simple Notification */
import VeeValidate from 'vee-validate' /* Form Validation */
import VueTimeago from 'vue-timeago' /* Human Readable Time */
import VueAgile from 'vue-agile' /* Carousel */
import Bars from 'vuebars' /* Chart */
import VueYouTubeEmbed from 'vue-youtube-embed' /* Embed Youtube Video */
import VueClazyLoad from 'vue-clazy-load' /* Lazyload Images */
import VueImg from 'v-img' /* Image Gallery Directive */
import Echo from 'laravel-echo' /* Make App Realtime */
import VueEcho from 'vue-echo' /* Vue Wrapper for laravel echo */
import VueCookie from 'vue-js-cookie'
import VueVisible from 'vue-visible'
import initialData from './mixins/initial-state' /* Our Initial State Provided By Our App */
import './services/acl' /* Add ACL To Our Routes */

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
const timeagoConfig = {
    name: 'timeago',
    locale: 'en-US',
    locales: {
        'en-US': require('vue-timeago/locales/en-US.json')
    }
}

/* Install Vue Plugins */

Vue.use(Vuetify)
Vue.use(Vue2Filters)
Vue.use(VueDefaultValue)
Vue.use(VueUp)
Vue.use(VueAgile)
Vue.use(Bars)
Vue.use(VueYouTubeEmbed)
Vue.use(VueClazyLoad)
Vue.use(VueImg)
Vue.use(VueTimeago, timeagoConfig)
Vue.use(VeeValidate, veeConfig)
Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(VueVisible)
/* Seed Initial State as Mixins */
Vue.mixin(initialData)

/**
 * Only Load Laravel Echo if Socket.io is Present, Can Be Configure in echo.php
 * If Set to Realtime then this Will be Loaded.
 */

if (typeof io !== 'undefined') {
    window.Echo = Echo
    let EchoInstance = new Echo({
        namespace: 'App\\Events',
        broadcaster: 'socket.io',
        host: `${window.location.hostname}:6001`
    })
    /* Install VueEcho: this.$echo */
    Vue.use(VueEcho, EchoInstance)
}
