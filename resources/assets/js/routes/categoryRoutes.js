const Categories = () => import('../pages/Categories.vue')
const Category = () => import('../pages/Category.vue')

export default [
    {
        path: '/categories',
        component: Categories,
        name: 'category.index',
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
        path: '/categories/:slug',
        component: Category,
        props: (route) => (
            {
                query: {
                    q: route.query.q || '',
                    page: route.query.page || 1
                },
                slug: route.params.slug }),
        name: 'category.show',
        meta: {
            permission: 'guest',
            fail: '/error'
        }
    }
]
