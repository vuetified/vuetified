import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
/* Add Below All Your Modules */
import auth from './store/modules/auth'
import permission from './store/modules/permission'
import cart from './store/modules/cart'
import checkout from './store/modules/checkout'
import wizard from './store/modules/wizard'
import referral from './store/modules/referral'
// import users from './modules/users'

export default new Store({
    modules: {
        auth,
        permission,
        cart,
        checkout,
        wizard,
        referral
        // users,
        /* add other modules here */
    },

    plugins: [createPersistedState({
        /* Check All Options You Can Pass At this Link */
        /* https://github.com/robinvdvleuten/vuex-persistedstate#createpersistedstateoptions */
        key: App.site.trademark,
        // Declare All The State We Want to Persist (use dot anotation for object.key)
        paths: ['auth', 'checkout', 'wizard', 'referral']
    })]
})
