import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendorsController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/vendors/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    const users = await User.query()
      .withScopes((scopes) => scopes.vendors())
      .orderBy('created_at', 'desc')
      .if(search, (query) => {
        query.whereILike('fullName', `%${search}%`)
      })
      .paginate(page, limit)

    return users
  }
}
