const Products = () => import('../pages/Products.vue')
const Product = () => import('../pages/Product.vue')

export default [
    {
        path: '/products',
        component: Products,
        name: 'product.index',
        props: (route) => ({ query: {
            q: route.query.q || '',
            page: route.query.page || 1
        } }),
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
    }
]
