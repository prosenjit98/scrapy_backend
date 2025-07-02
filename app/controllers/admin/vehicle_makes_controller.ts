import VehicleMake from '#models/vehicle_make'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleMakesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('Admin/vehicle_makes/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    // const usersQuery = User.query()
    // if (search) {
    //   usersQuery.whereILike('fullName', `%${search}%`)
    // }
    // const users = await usersQuery.paginate(page, 10)
    const makes = await VehicleMake.query()
      .orderBy('created_at', 'desc')
      .if(search, (query) => {
        query.whereILike('name', `%${search}%`)
      })
      .paginate(page, limit)

    return makes
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('Admin/vehicle_makes/create')
  }

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['name'])
    await VehicleMake.create(data)
    session.flash('success', 'Vehicle make created successfully')
    return response.redirect('/admin/vehicle_makes')
  }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const make = await VehicleMake.findOrFail(params.id)
    return inertia.render('Admin/vehicle_makes/edit', { make })
  }

  /**
   * Handle form submission for the edit action
   */

  public async update({ params, request, response, session }: HttpContext) {
    const user = await VehicleMake.findOrFail(params.id)
    user.merge(request.only(['fullName', 'email', 'password', 'role', 'phoneNumber']))
    await user.save()
    session.flash('success', 'User Updated successfully')
    return response.redirect('/admin/vehicle_makes')
  }
}
