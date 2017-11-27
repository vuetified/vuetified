const Products = () => import('../pages/Products.vue')
const Product = () => import('../pages/Product.vue')
//* much better if we can use the same Product page for edit
const EditProduct = () => import('../pages/EditProduct.vue')

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
    },
    //* much better if we can use the same Product page for edit
    {
        path: '/products/:slug/edit',
        component: EditProduct,
        props: true,
        name: 'product.edit',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    }
]
