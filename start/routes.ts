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
import InquiriesController from '#controllers/inquiries_controller'
import UsersController from '#controllers/users_controller'
const AuthController = () => import('#controllers/admin/auth_controller')
const AdminDashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users_controller')
const AdminVendorsController = () => import('#controllers/admin/vendors_controller')
const UserAuthController = () => import('#controllers/user_auth_controller')
const HomeController = () => import('#controllers/home_controller')
const AdminVehiclesController = () => import('#controllers/admin/vehicles_controller')
const AdminPartsController = () => import('#controllers/admin/parts_controller')
const AdminVehiclesMakeController = () => import('#controllers/admin/vehicle_makes_controller')
const AdminVehicleModelController = () => import('#controllers/admin/vehicle_models_controller')
const AdminProposalsController = () => import('#controllers/admin/proposals_controller')
const AdminInquiriesController = () => import('#controllers/admin/inquiries_controller')

const ApiSessionController = () => import('#controllers/api/auth_controller')
const ApiDashboardController = () => import('#controllers/api/dashboard_controller')
const ApiUsersController = () => import('#controllers/api/users_controller')
const ApiVehiclesController = () => import('#controllers/api/vehicles_controller')
const ApiPartsController = () => import('#controllers/api/parts_controller')
const ApiProposalsController = () => import('#controllers/api/proposals_controller')

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
        router.get('/proposals/list', [AdminProposalsController, 'list']).as('admin.proposals.list')
        router.resource('/proposals', AdminProposalsController).as('admin.proposals')
        router.get('/inquiries/list', [AdminInquiriesController, 'list']).as('admin.inquiries.list')
        router.resource('/inquiries', AdminInquiriesController).as('admin.inquiries')
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

router.get('/', [HomeController, 'index']).as('home')
router.get('/login', [UserAuthController, 'showLogin']).as('login')
router.post('/login', [UserAuthController, 'login'])
router.post('/logout', [UserAuthController, 'logout'])
router.get('/signup', [UserAuthController, 'showSignup']).as('signup')
router.post('/sign-up', [UserAuthController, 'signup'])


// Protected inquiry routes (require authentication)
router
  .group(() => {
    router.get('/inquiries/new', [InquiriesController, 'new']).as('inquiries.new')
    router.post('/inquiries', [InquiriesController, 'create']).as('inquiries.create')
    router.get('/inquiries/:id/edit', [InquiriesController, 'edit']).as('inquiries.edit')
    router.put('/inquiries/:id', [InquiriesController, 'update']).as('inquiries.update')

    router.get('/switch_to_selling/:id', [UsersController, 'switch_to_selling']).as('inquiries.switch_to_selling')
  })
  .use(middleware.auth({
    guards: ['web']
  }))

// Public inquiry routes with parameters (must come after specific routes)
router.get('/inquiries/:id', [InquiriesController, 'show']).as('inquiries.show')

router
  .group(() => {
    router.post('/login', [ApiSessionController, 'login']).as('api.login')
    router.post('/signup', [ApiSessionController, 'signup']).as('api.signup')

    router
      .group(() => {
        router.delete('/logout', [ApiSessionController, 'logout'])
        router.get('/dashboard', [ApiDashboardController, 'index']).as('api.dashboard')
        router.resource('/users', ApiUsersController).only(['update']).as('api.users')
        router.resource('/vehicles', ApiVehiclesController).apiOnly().as('api.vehicles')
        router.resource('/parts', ApiPartsController).apiOnly().as('api.parts')
        router.get('/models', [ApiVehiclesController, 'models']).as('api.models')
        router.get('/makes', [ApiVehiclesController, 'makes']).as('api.makes')
        router.resource('/proposals', ApiProposalsController).as('api.proposals')
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
