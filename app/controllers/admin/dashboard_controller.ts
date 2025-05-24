import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/dashboard')
  }
}
