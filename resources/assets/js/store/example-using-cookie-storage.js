import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
/* Add Below All Your Modules */
import auth from './modules/auth'
import permission from './modules/permission'
// import users from './modules/users'

export default new Store({
    modules: {
        auth,
        permission
        // users,
        /* add other modules here */
    },

    plugins: [createPersistedState({
        /* Check All Options You Can Pass At this Link */
        /* https://github.com/robinvdvleuten/vuex-persistedstate#createpersistedstateoptions */
        key: App.site.trademark,
        // Declare All The State We Want to Persist (use dot anotation for object.key)
        paths: ['auth'],
        /* Use Cookie Instead of Local Storage (default: localstorage) */
        getState: (key) => Cookies.getJSON(key),
        setState: (key, state) => Cookies.set(key, state, {expires: 365}),
        removeItem: key => Cookies.remove(key)
    })]
})
