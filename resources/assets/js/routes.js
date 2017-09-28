import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import homeRoutes from './routes/homeRoutes'
import productRoutes from './routes/productRoutes'
import profileRoutes from './routes/profileRoutes'

let routeFiles = []
/* Multi Route Files */
const routes = routeFiles.concat(
    authRoutes, categoryRoutes,
    homeRoutes, productRoutes,
    profileRoutes
    /* add here Other Routes File */
)
export default routes
