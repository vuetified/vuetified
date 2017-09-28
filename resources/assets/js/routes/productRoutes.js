const Products = () => import('../pages/Products.vue')
const Product = () => import('../pages/Product.vue')

module.exports = [
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
    }
]
