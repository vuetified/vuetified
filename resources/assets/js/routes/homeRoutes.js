const Home = () => import('../pages/Home.vue')
const About = () => import('../pages/About.vue')
const Cart = () => import('../components/Cart.vue')
const Support = () => import('../pages/Support.vue')
const ThankYou = () => import('../pages/ThankYou.vue')

export default [
    /* Front End Routes */
    {
        path: '/about',
        component: About,
        name: 'about',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/cart',
        component: Cart,
        name: 'cart',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/support',
        component: Support,
        name: 'support',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/thank-you',
        component: ThankYou,
        name: 'thankyou',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    }
]
