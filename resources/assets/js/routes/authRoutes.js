const Login = () => import('../pages/Login.vue')
const Logout = () => import('../pages/Logout.vue')
const Register = () => import('../pages/Register.vue')
const ResetPassword = () => import('../pages/ResetPassword.vue')
const ForgotPassword = () => import('../pages/ForgotPassword.vue')

export default [
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
    }
    /* End Authentication Routes */
]
