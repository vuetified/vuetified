import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import homeRoutes from './routes/homeRoutes'
import productRoutes from './routes/productRoutes'
import profileRoutes from './routes/profileRoutes'
import errorRoutes from './routes/errorRoutes'

let routeFiles = []
/* Multi Route Files */
const routes = routeFiles.concat(
    authRoutes, categoryRoutes,
    homeRoutes, productRoutes,
    profileRoutes, errorRoutes
    /* add here Other Routes File */
)
export default routes
