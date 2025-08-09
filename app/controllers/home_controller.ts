import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ inertia, auth }: HttpContext) {
    // Check if user is authenticated
    let user = null
    
    try {
      // Try to get the current authenticated user
      await auth.use('web').check()
      if (auth.use('web').isAuthenticated) {
        const authenticatedUser = auth.use('web').user!
        user = {
          name: authenticatedUser.fullName,
          avatar: undefined, // You can add avatar logic later if needed
        }
      }
    } catch (error) {
      // User is not authenticated, user remains null
    }

    return inertia.render('public/home', {
      user: user
    })
  }
}
