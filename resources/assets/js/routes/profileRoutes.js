const Checkout = () => import('../pages/Checkout.vue')
const Dashboard = () => import('../pages/Dashboard.vue')

module.exports = [
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
        path: '/checkout',
        component: Checkout,
        name: 'checkout',
        meta: {
            requiresAuth: true,
            permission: 'guest',
            fail: '/error'
        }
    }
    /* End Authenticated Routes */
]
