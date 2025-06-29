/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/admin/auth_controller')
const AdminDashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users_controller')
const AdminVendorsController = () => import('#controllers/admin/vendors_controller')
const UserAuthController = () => import('#controllers/user_auth_controller')

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
      })
      .middleware(async ({ auth, response }, next) => {
        await auth.use('admin_web').check()
        if (!auth.use('admin_web').isAuthenticated) {
          return response.redirect('/admin/login')
        }
        console.log(auth)
        await next()
      })
  })
  .prefix('/admin')

router.on('/').renderInertia('public/home2')
router.get('/login', [UserAuthController, 'showLogin']).as('login')
router.post('/login', [UserAuthController, 'login'])
router.post('/logout', [UserAuthController, 'logout'])
router.get('/signup', [UserAuthController, 'showSignup']).as('signup')
router.post('/sign-up', [UserAuthController, 'signup'])
router.get('/forgot-password', 'AuthController.showForgotPassword').as('forgot-password')
router.post('/forgot-password', 'AuthController.forgotPassword')
router.get('/reset-password/:token', 'AuthController.showResetPassword').as('reset-password')
router.post('/reset-password', 'AuthController.resetPassword')
