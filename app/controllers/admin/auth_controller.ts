import type { HttpContext } from '@adonisjs/core/http'
import AdminUser from '#models/admin_user'

export default class AuthController {
  public async showLogin({ inertia }: HttpContext) {
    return inertia.render('Admin/Auth/admin_login')
  }

  public async login({ request, auth, response, session }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await AdminUser.verifyCredentials(email, password)
      await auth.use('admin_web').login(user)
      session.flash('success', 'Logged in successfully')
      return response.redirect('/admin/dashboard')
    } catch (error) {
      session.flash('errors', {
        email: 'Invalid credentials',
      })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response, session }: HttpContext) {
    await auth.use('admin_web').logout()
    session.flash('success', 'Logged out in successfully')
    return response.redirect('/admin/login')
  }
}
