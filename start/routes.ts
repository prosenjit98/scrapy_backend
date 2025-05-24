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
const AdminUsersController = () => import('#controllers/admin/dashboard_controller')

router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('admin.login')
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout'])

    router
      .group(() => {
        router.get('/dashboard', [AdminDashboardController, 'index']).as('admin.dashboard')
        router.resource('/users', AdminUsersController).only(['index', 'edit', 'update'])
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

router.on('/').renderInertia('home')
