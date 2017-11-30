import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// import store from './store'
// import Meta from 'vue-meta'
// import VueHead from 'vue-head'

// Vue.use(Meta)
// Vue.use(VueHead)
/* SEO META */
// Vue.use(Meta, {
//     keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
//     attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
//     ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
//     tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
// })

Vue.use(VueRouter)

/* Our Vue Router Object */
const router = new VueRouter({
    routes,
    /* Use Pretty URL */
    mode: 'history',
    /* Save The Scroll Position , Useful When Redirecting Back */
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

/* Middlewares */
router.beforeEach((to, from, next) => {
    /* for all authenticated routes */
    if (to.matched.some(m => m.meta.requiresAuth)) {
        return axios.post(route('api.auth.check')).then(() => {
            return next()
        }).catch(() => {
            let form = new AppForm(App.forms.logoutForm)
            vm.$store.dispatch('auth/logout', form)
        })
    }
    /* If No Middleware, Then Just Proceed As Normal */
    return next()
})

export default router
