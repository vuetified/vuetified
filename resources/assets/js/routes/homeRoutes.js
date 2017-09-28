const Home = () => import('../pages/Home.vue')
const About = () => import('../pages/About.vue')
const Cart = () => import('../components/Cart.vue')
const Courses = () => import('../pages/Courses.vue')
const Support = () => import('../pages/Support.vue')

module.exports = [
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
        path: '/courses',
        component: Courses,
        name: 'course',
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
    }
]
