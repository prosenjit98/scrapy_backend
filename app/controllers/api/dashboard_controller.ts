import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async index({ response }: HttpContext) {
    return response.ok({ message: 'Dashboard data' })
  }
}
