const Checkout = () => import('../pages/Checkout.vue')
const Dashboard = () => import('../pages/Dashboard.vue')
const Settings = () => import('../pages/Settings.vue')
const Users = () => import('../pages/Users.vue')
const AccessToken = () => import('../components/checkmeout/AccessToken.vue')

export default [
    /* Start Authenticated Routes */
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/settings',
        component: Settings,
        name: 'settings',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/checkmeout/access-token',
        component: AccessToken,
        name: 'checkmeout.login',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/checkout',
        component: Checkout,
        name: 'checkout',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/users',
        component: Users,
        name: 'users',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    }
    /* End Authenticated Routes */
]
