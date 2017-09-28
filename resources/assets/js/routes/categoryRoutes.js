const Categories = () => import('../pages/Categories.vue')
const Category = () => import('../pages/Category.vue')

module.exports = [
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
    }
]
