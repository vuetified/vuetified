import Vue from 'vue'
import VueRouter from 'vue-router'

/* Lazy Loading Routes */
const About = () => import('./pages/About.vue')
const Courses = () => import('./pages/Courses.vue')
const Cart = () => import('./components/Cart.vue')
const Checkout = () => import('./pages/Checkout.vue')
const Categories = () => import('./pages/Categories.vue')
const Category = () => import('./pages/Category.vue')
const Dashboard = () => import('./pages/Dashboard.vue')
const ForgotPassword = () => import('./pages/ForgotPassword.vue')
const Home = () => import('./pages/Home.vue')
const Login = () => import('./pages/Login.vue')
const Logout = () => import('./pages/Logout.vue')
const NotFound = () => import('./pages/NotFound.vue')
const Products = () => import('./pages/Products.vue')
const Product = () => import('./pages/Product.vue')
const Register = () => import('./pages/Register.vue')
const ResetPassword = () => import('./pages/ResetPassword.vue')
const Support = () => import('./pages/Support.vue')

Vue.use(VueRouter)

/* routes start here */
const routes = [

    /* Start Authentication Routes */
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword,
        name: 'forgotpassword',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/forgotpassword/:token',
        props: true,
        component: ResetPassword,
        name: 'resetpassword',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/logout',
        component: Logout,
        name: 'logout',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    /* End Authentication Routes */

    /* Front End Routes */
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
        path: '/categories',
        component: Categories,
        name: 'category.index',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/categories/:slug',
        component: Category,
        props: true,
        name: 'category.show',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/products',
        component: Products,
        name: 'product.index',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    },
    {
        path: '/products/:slug',
        component: Product,
        props: true,
        name: 'product.show',
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
    },
    /* End Authenticated Routes */

    /* Start Error Handing Routes */
    {
        path: '/404.html',
        component: NotFound,
        name: 'error',
        meta: {
            permission: 'guest'
        }
    },
    /* End Error Handing Routes */

    /* Default Route */
    {
        path: '*',
        component: NotFound,
        name: 'default',
        meta: {
            permission: 'guest'
        }
    }
]
/* routes ends here */

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
        /* Check For Laravel Passport Access Token Cookie */
        if (!Bus.$cookie.get('access_token')) {
            return next({ path: '/login' })
        }
        return next()
    }
    /* If No Middleware, Then Just Proceed As Normal */
    return next()
})

export default router
