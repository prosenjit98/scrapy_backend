/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/admin/auth_controller')
const AdminDashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users_controller')
const AdminVendorsController = () => import('#controllers/admin/vendors_controller')
const AdminVehiclesController = () => import('#controllers/admin/vehicles_controller')
const AdminPartsController = () => import('#controllers/admin/parts_controller')
const AdminVehiclesMakeController = () => import('#controllers/admin/vehicle_makes_controller')
const AdminVehicleModelController = () => import('#controllers/admin/vehicle_models_controller')

const ApiSessionController = () => import('#controllers/api/auth_controller')
const ApiDashboardController = () => import('#controllers/api/dashboard_controller')
const ApiUsersController = () => import('#controllers/api/users_controller')
// const ApiVehiclesController = () => import('#controllers/api/vehicles_controller')
// const ApiPartsController = () => import('#controllers/api/parts_controller')

router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('admin.login')
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout'])

    router
      .group(() => {
        router.get('/dashboard', [AdminDashboardController, 'index']).as('admin.dashboard')
        router.get('/users/list', [AdminUsersController, 'list']).as('admin.users.list')
        router.resource('/users', AdminUsersController)
        router.get('/vendors/list', [AdminVendorsController, 'list']).as('admin.vendors.list')
        router.resource('/vendors', AdminVendorsController).only(['index'])
        router.get('/vehicles/list', [AdminVehiclesController, 'list']).as('admin.vehicles.list')
        router.resource('/vehicles', AdminVehiclesController).as('admin.vehicles')
        router.get('/parts/list', [AdminPartsController, 'list']).as('admin.parts.list')
        router.resource('/parts', AdminPartsController).as('admin.parts')
        router
          .get('/vehicle_makes/list', [AdminVehiclesMakeController, 'list'])
          .as('admin.vehicle_makes.list')
        router
          .get('/vehicle_models/list', [AdminVehicleModelController, 'list'])
          .as('admin.vehicle_models.list')
        router.resource('/vehicle_makes', AdminVehiclesMakeController)
        router.resource('/vehicle_models', AdminVehicleModelController)
      })
      .middleware(async ({ auth, response }, next) => {
        await auth.use('admin_web').check()
        if (!auth.use('admin_web').isAuthenticated) {
          return response.redirect('/admin/login')
        }
        await next()
      })
  })
  .prefix('/admin')

router
  .group(() => {
    router.post('/login', [ApiSessionController, 'login']).as('api.login')
    router.post('/signup', [ApiSessionController, 'signup']).as('api.signup')

    router
      .group(() => {
        router.delete('/logout', [ApiSessionController, 'logout'])
        router.get('/dashboard', [ApiDashboardController, 'index']).as('api.dashboard')
        router.resource('/users', ApiUsersController).only(['update']).as('api.users')
      })
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('/api/v1')

// router.on('/').renderInertia('home')
router.any('*', async ({ request, response }) => {
  return response.notFound({
    message: `Route not found: ${request.method()} ${request.url()}`,
  })
})
