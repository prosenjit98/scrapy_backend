// import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async index({ auth, response }: HttpContext) {
    const user = auth?.user
    // await User.preComputeUrls(user as User)
    return response.ok({ message: 'Dashboard data', data: user ?? {} })
  }
}
